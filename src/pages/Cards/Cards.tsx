import { useState, useMemo } from 'react';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import Card from '../../components/Card/Card';
import CreateCardDialog from '../../components/CreateCardDialog/CreateCardDialog';
import Selector from '../../components/Selector/Selector';
import Tag from '../../components/Tag/Tag';
import TagSearch from '../../sections/TagSearch/TagSearch';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';
import { MdSearch } from "react-icons/md";
import './Cards.css';


const Cards = (props: {
  collection_id?: number | null;
}) => {
  const [sortingType, setSortingType] = useState<number>(0);
  const [drawerSection, setDrawerSection] = useState('');
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const collections = useCollectionStore((state) => state.collections);
  const collection = props.collection_id ? collections.find((c) => c.id === props.collection_id) : null;
  const cards = useCardStore((state) => state.cards);

  const result_cards = props.collection_id ? cards.filter((card) => {
    return card.collection_id === props.collection_id;
  }) : cards;

  const filtered_cards = useMemo(() => {
    if (tagFilters.length < 1) {
      return result_cards;
    } else {
      return result_cards.reduce((results: any[], card: any) => {
        let is_included = true;
        tagFilters.forEach((tag) => {
          if (!card.tags.includes(tag)) {
            is_included = false;
          }
        });
        if (is_included) results.push(card);
        return results;
      }, []);
    }
  }, [tagFilters, cards, props.collection_id]);

  const searched_cards = useMemo(() => {
    if (searchText === '') {
      return filtered_cards;
    } else {
      return filtered_cards.reduce((results: any[], card: any) => {
        if (card.label.includes(searchText)) {
          results.push(card);
        }
        return results;
      }, []);
    }

  }, [filtered_cards, searchText]);

  const sorted_cards = useMemo(() => {
    if (sortingType === 1) {
      return [...searched_cards.toSorted((a, b) => a.label < b.label ? -1 : 1)];
    } else {
      return [...searched_cards];
    }
  }, [sortingType, searched_cards]);

  const handleAddTag = (tag: string) => {
    let filters = [...tagFilters];
    filters.push(tag);
    setTagFilters([...filters]);
  };

  const handleRemovetag = (tag: string) => {
    let filters = [...tagFilters];
    filters = filters.filter((t) => t !== tag);
    setTagFilters([...filters]);
  };

  const handleSection = (s: string) => {
    if (drawerSection !== s) setDrawerSection(s);
    else setDrawerSection('');
  };

  return (
    <div className="Cards">
      <img className="content-background" src={collection?.background} />
      <div className="content-title">{
        props.collection_id
          ? <>CARDS IN <span>{collection?.label}</span></>
          : 'CARDS'
      }</div>
      <div className="sections"></div>
      <ToolbarDrawer>
        {
          drawerSection === 'tags' &&
          <>
            <div className="DeckTags">
              {
                tagFilters?.map((tag) => (
                  <Tag
                    label={tag}
                    className={`${drawerSection === 'tags' ? 'can-remove' : ''}`}
                    onClick={() => {
                      if (drawerSection === 'tags') handleRemovetag(tag);
                    }}
                  />
                ))
              }
            </div>
            <TagSearch activeTags={tagFilters} addHandler={handleAddTag} />
          </>
        }
      </ToolbarDrawer>
      <Toolbar>
        {collection && <CreateCardDialog />}
        <button className={drawerSection === 'tags' ? 'active' : ''} onClick={() => handleSection('tags')}>FILTER CARDS</button>
        <Selector
          className="selector-sort"
          defaultValue={0}
          options={['SORT: Creation Date', 'SORT: Alphabetical']}
          onSelect={(val) => setSortingType(val)}
        />
        <div className={"searchbar"}>
          <input type="text" onChange={(e) => setSearchText(e.target.value)} />
          <MdSearch />
        </div>
      </Toolbar>
      <div className="results">
        {
          sorted_cards?.map((card) => <Card data={card} />)
        }
      </div>
    </div>
  );
};

export default Cards;
import { useState, useMemo } from 'react';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import Card from '../../components/Card/Card';
import CreateCardDialog from '../../components/CreateCardDialog/CreateCardDialog';
import Toolbar from '../../components/Toolbar/Toolbar';

import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';
import TagSearch from '../../sections/TagSearch/TagSearch';
import Tag from '../../components/Tag/Tag';

import './Cards.css';


const Cards = (props: {
  collection_id?: number | null;
}) => {
  const [drawerSection, setDrawerSection] = useState('');
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const collections = useCollectionStore((state) => state.collections);
  const collection = props.collection_id ? collections.find((c) => c.id === props.collection_id) : null;
  const cards = useCardStore((state) => state.cards);
  const result_cards = props.collection_id ? cards.filter((card) => {
    console.log(card.collection_id, props.collection_id);
    return card.collection_id === props.collection_id;
  }) : cards;

  console.log(result_cards);

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

  const handleAddTag = (tag: string) => {
    let filters = [...tagFilters];
    filters.push(tag);
    setTagFilters([...filters]);
  };

  const handleRemovetag = (tag: string) => {
    let filters = [...tagFilters];
    console.log(filters, tag);
    filters = filters.filter((t) => t !== tag);
    console.log(filters);
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
        {drawerSection === 'tags' && <TagSearch activeTags={tagFilters} addHandler={handleAddTag} />}
      </ToolbarDrawer>
      <Toolbar>
        {collection && <CreateCardDialog />}
        <button onClick={() => handleSection('tags')}>FILTER CARDS</button>
      </Toolbar>
      <div className="results">
        {
          filtered_cards?.map((card) => <Card data={card} />)
        }
      </div>
    </div>
  );
};

export default Cards;
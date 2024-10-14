import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import CardWideDisplay from '../../components/CardWideDisplay/CardWideDisplay';
import CreateCardDialog from '../../components/AppBar/components/CreateCardDialog';
import SearchBar from '../../components/SearchBar/SearchBar';
import Selector from '../../components/Selector/Selector';
import Toolbar from '../../components/Toolbar/Toolbar';
import useCardStore, { ICard } from '../../store/useCardStore';
import useSetStore from '../../store/useSetStore';
import useDeckStore from '../../store/useDeckStore';
import useTagStore from '../../store/useTagStore';
import './Cards.css';


const Cards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortingType, setSortingType] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const active_tags = useTagStore((state) => state.active_tags);
  const sets = useSetStore((state) => state.sets);
  const decks = useDeckStore((state) => state.decks);
  const cards = useCardStore((state) => state.cards);

  const set_id = searchParams.get('set');
  const set = useMemo(() => set_id ? sets.find((c) => c.id === +set_id) : null, [set_id]);
  const deck_id = searchParams.get('deck');
  const deck = useMemo(() => deck_id ? decks.find((d) => d.id === +deck_id) : null, [deck_id]);

  const cards_selection = useMemo(() => {
    if (set_id) {
      return cards.filter((card) => card.set_id === +set_id);
    } else {
      return cards;
    }
  }, [cards, set_id]);

  const cards_filtered = useMemo(() => {
    if (active_tags.length > 0) {
      return cards_selection.reduce((results: ICard[], card) => {
        let is_included = true;
        active_tags.forEach((tag) => {
          if (!card.tags.includes(tag)) {
            is_included = false;
          }
        });
        if (is_included) results.push(card);
        return results;
      }, []);
    } else {
      return cards_selection;
    }
  }, [cards_selection, active_tags]);

  const cards_searched = useMemo(() => {
    if (searchText !== '') {
      return cards_filtered.reduce((results: ICard[], card) => {
        if (card.label.toLowerCase().includes(searchText.toLowerCase())) {
          results.push(card);
        }
        return results;
      }, []);
    } else {
      return cards_filtered;
    }
  }, [cards_filtered, searchText]);

  const cards_sorted = useMemo(() => {
    if (sortingType === 1) {
      return [...cards_searched.toSorted((a, b) => a.label < b.label ? -1 : 1)];
    } else {
      return cards_searched;
    }
  }, [cards_searched, sortingType]);

  const title = useMemo(() => {
    if (set) return <>CARDS IN <span>{set.label}</span></>;
    else if (deck) return <>CARDS IN <span>{deck.label}</span></>;
    else return <>CARDS</>;
  }, [set, deck]);

  return (
    <div className="Cards">
      <Toolbar
        startElements={[
          <Selector
            defaultValue={0}
            options={['SORT: Creation Date', 'SORT: Alphabetical']}
            onSelect={(val) => setSortingType(val)}
          />,
        ]}
        endElements={[
          <SearchBar onChange={(text) => setSearchText(text)} />
        ]}
      />
      <div className={`section-title ${(!set && !deck) && 'small'}`}>{title}</div>
      <div className="section-separator" />
      <div className="results">
        {
          cards_sorted?.map((card) => <Card data={card} />)
        }
      </div>
      {/* <CardDisplay /> */}
      {/* <CardWideDisplay /> */}
    </div>
  );
};

export default Cards;
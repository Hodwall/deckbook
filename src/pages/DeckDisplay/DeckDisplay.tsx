import { useState } from 'react';
import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import useCollectionStore from '../../store/useCollectionStore';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import DeckTags from '../../components/DeckTags/DeckTags';
import TagSearch from '../../sections/TagSearch/TagSearch';
import Toolbar from '../../components/Toolbar/Toolbar';
import './DeckDisplay.css';


const DeckDisplay = () => {
  const [section, setSection] = useState('');
  const addTagToDeck = useDeckStore((state) => state.addTagToDeck);
  const active_deck = useDeckStore((state) => state.active_deck);
  const active_collection = useCollectionStore((state) => state.active_collection);
  const decks = useDeckStore((state) => state.decks);
  const cards = useCardStore((state) => state.cards);
  const deck = decks.find((d) => d.id === active_deck);

  const filtered_cards = cards.reduce((results: any[], card: any) => {
    if (card.collection_id === active_collection && deck) {
      let is_card_included = false;
      card.tags.forEach((card_tag: any) => {
        deck.tags.forEach((deck_tag) => {
          if (deck_tag.id === card_tag.id) {
            is_card_included = true;
          }
        });
      });
      if (is_card_included) {
        results.push(card);
      }
    }
    return results;
  }, []);

  const handleSection = (s: string) => {
    if (section !== s) setSection(s);
    else setSection('');
  };

  return (
    <div className="DeckDisplay">
      <img className="background" src={deck?.background} />
      <div className="title">{deck?.label}</div>
      <DeckTags isEditMode={section === 'tags'} />
      <div className="CustomSection">
        {
          section === 'tags' &&
          <TagSearch type='deck' taggableElement={deck} addHandler={addTagToDeck} />
        }
      </div>
      <Toolbar>
        {/* <CreateCardDialog /> */}
        <Button onClick={() => handleSection('tags')}>EDIT TAGS</Button>
      </Toolbar>
      <div className="results">
        {
          filtered_cards.map((card) => <Card data={card} />)
        }
      </div>
    </div >
  );
};

export default DeckDisplay;
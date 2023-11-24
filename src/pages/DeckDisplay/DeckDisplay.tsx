import { useState } from 'react';
import useDeckStore from '../../store/useDeckStore';
import DeckTags from '../../components/DeckTags/DeckTags';
import DeckCards from '../../components/DeckCards/DeckCards';
import TagSearch from '../../sections/TagSearch/TagSearch';
import Toolbar from '../../components/Toolbar/Toolbar';
import './DeckDisplay.css';


const DeckDisplay = () => {
  const [section, setSection] = useState('');
  const addTagToDeck = useDeckStore((state) => state.addTagToDeck);
  const active_deck = useDeckStore((state) => state.active_deck);
  const decks = useDeckStore((state) => state.decks);
  const deck = decks.find((d) => d.id === active_deck);

  const handleSection = (s: string) => {
    if (section !== s) setSection(s);
    else setSection('');
  };

  const handleAddTag = (tag: string) => {
    if (deck) addTagToDeck(deck.id, tag);
  };

  return (
    <div className="DeckDisplay">
      <img className="content-background" src={deck?.background} />
      <div className="content-title">{deck?.label}</div>
      <DeckTags isEditMode={section === 'tags'} />
      <div className="CustomSection">
        {
          section === 'tags' &&
          <TagSearch activeTags={[...deck?.tags || []]} addHandler={handleAddTag} />
        }
      </div>
      <Toolbar>
        {/* <CreateCardDialog /> */}
        <button onClick={() => handleSection('tags')}>EDIT TAGS</button>
      </Toolbar>
      <DeckCards />
    </div >
  );
};

export default DeckDisplay;
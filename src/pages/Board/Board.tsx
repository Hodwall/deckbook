import { useState, useEffect } from 'react';
import useLibraryStore from '../../store/useLibraryStore';
import useDeckStore from '../../store/useDeckStore';
import useCardStore from '../../store/useCardStore';

import Toolbar from '../../components/Toolbar/Toolbar';
import Card from '../../components/Card/Card';

import './Board.css';
import PinnedDecks from './Sections/PinnedDecks';

import DeckCards from '../../components/DeckCards/DeckCards';


const Board = () => {
  const [section, setSection] = useState<string | null>(null);

  const [libraries, active_library] = useLibraryStore((state) => [state.libraries, state.active_library]);
  const library = libraries.find((l) => l.id === active_library);

  const [decks, active_deck, setActiveDeck] = useDeckStore((state) => [state.decks, state.active_deck, state.setActiveDeck]);
  const deck = decks.find((d) => d.id === active_deck);

  const background = (() => {
    if (!active_deck) return library?.background;
    else return deck?.background;
  })();

  useEffect(() => {
    setActiveDeck(null);
  }, []);





  return (
    <div className="Board">
      <div className="side-section">
        <div>
          <div className="title">{library?.label}</div>
          <div className="section">
            <Toolbar>
              <button disabled>Stats</button>
              <button disabled>Skills</button>
              <button disabled>Inventory</button>
              <button disabled>Spells</button>
              <button onClick={() => setSection(null)}>Pinned Decks</button>
            </Toolbar>
            <div className="content">
              {
                <PinnedDecks />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="main-section">
        <img className="content-background" src={background} />
        <div className="section">
          {/* <Toolbar>
            <button onClick={() => setSection('stats')}>Stats</button>
            <button onClick={() => setSection(null)}>Skills</button>
            <button onClick={() => setSection(null)}>Inventory</button>
            <button onClick={() => setSection(null)}>Spells</button>
          </Toolbar> */}
          <div className="content">
            <div className="results">
              <DeckCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
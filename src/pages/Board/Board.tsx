import { useState, useEffect } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import useDeckStore from '../../store/useDeckStore';
import DeckCards from '../../components/DeckCards/DeckCards';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Board.css';
import SideDecks from './Components/SideDecks';
import Stats from './Components/Stats';


const Board = () => {
  const [section, setSection] = useState<string | null>(null);
  const [sideSection, setSideSection] = useState<string | null>(null);

  const [collections, active_collection] = useCollectionStore((state) => [state.collections, state.active_collection]);
  const collection = collections.find((c) => c.id === active_collection);

  const [decks, active_deck, setActiveDeck] = useDeckStore((state) => [state.decks, state.active_deck, state.setActiveDeck]);
  const deck = decks.find((d) => d.id === active_deck);

  const background = (() => {
    if (!active_deck) return collection?.background;
    else return deck?.background;
  })();

  useEffect(() => {
    setActiveDeck(null);
  }, []);

  return (
    <div className="Board">
      <img className="background" src={background} />
      <div className="title">{collection?.label}</div>
      <div className="content">
        <div className="main">
          <div className="navigation">
            <Toolbar>
              <button onClick={() => setSection('stats')}>Stats</button>
              <button onClick={() => setSection(null)}>Skills</button>
              <button onClick={() => setSection(null)}>Journal</button>
              <button onClick={() => setSection(null)}>Map</button>
            </Toolbar>
          </div>
          <div className="main-content">
            <div className="board-section">
              {
                section === 'stats' && <Stats />
              }
            </div>
            {(section === 'stats' && active_deck) && <div className="separator" />}
            <DeckCards />
          </div>
        </div>
        <div className="side">
          <div className="navigation">
            <Toolbar>
              <button className={'active'}>Decks</button>
              <button disabled>Dice</button>

            </Toolbar>
          </div>
          <div className="side-content">
            {
              !sideSection && <SideDecks />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
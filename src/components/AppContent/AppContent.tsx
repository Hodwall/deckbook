import { useMemo } from 'react';
import useNavigationStore from '../../store/useNavigationStore';
import CardDisplay from '../CardDisplay/CardDisplay';
import Board from '../../pages/Board/Board';
import Cards from '../../pages/Cards/Cards';
import Collections from '../../pages/Collections/Collections';
import DeckDisplay from '../../pages/DeckDisplay/DeckDisplay';
import Decks from '../../pages/Decks/Decks';
import Libraries from '../../pages/Libraries/Libraries';
import Maps from '../../pages/Maps/Maps';
import MapDisplay from '../MapDisplay/MapDisplay';
import './AppContent.css';


const AppContent = () => {
  const section = useNavigationStore((state) => state.section);
  const sections: { [key: string]: JSX.Element; } = useMemo(() => {
    return {
      'libraries': <Libraries />,
      'board': <Board />,
      'decks': <Decks />,
      'collections': <Collections />,
      'collection-cards': <Cards collection_id={section.item_id} />,
      'cards': <Cards />,
      'deck-display': <DeckDisplay />,
      'maps': <Maps />
    };
  }, [section]);

  return (
    <>
      <div className="AppContent">
        <div className="header">
          <span>/ {section.name}</span>
          <span>DECKBOOK</span>
        </div>
        <div className="content">
          {sections[section.name] ?? <span>{section.name}</span>}
        </div>
      </div>
      <CardDisplay />
      <MapDisplay />
    </>
  );
};

export default AppContent;



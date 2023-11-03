import useNavigationStore from '../../store/useNavigationStore';
import Cards from '../../pages/Cards/Cards';
import CardDisplay from '../CardDisplay/CardDisplay';
import Collections from '../../pages/Collections/Collections';
import Decks from '../../pages/Decks/Decks';
import DeckDisplay from '../../pages/DeckDisplay/DeckDisplay';
import './AppContent.css';
import Board from '../../pages/Board/Board';


const AppContent = () => {
  const section = useNavigationStore((state) => state.section);

  const getSection = () => {
    switch (section) {
      case 'collections': return <Collections />;
      case 'decks': return <Decks />;
      case 'cards': return <Cards />;
      case 'deck-display': return <DeckDisplay />;
      case 'board': return <Board />;
      default: return <span>{section}</span>;
    }
  };

  return (
    <>
      <div className="AppContent">
        <div className="header">
          <span>/ {section}</span>
          <span>DECKBOOK</span>
        </div>
        <div className="content">
          {getSection()}
        </div>
      </div>
      <CardDisplay />
    </>
  );
};

export default AppContent;



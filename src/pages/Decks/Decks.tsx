import useDeckStore from '../../store/useDeckStore';
import Deck from '../../components/Deck/Deck';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Decks.css';


const Decks = () => {
  const decks = useDeckStore((state) => state.decks);

  return (
    <div className="Decks">
      <div className="section-title small">DECKS</div>
      <div className="section-separator"></div>
      <div className="results">
        {
          decks.map((c) => <Deck data={c} />)
        }
      </div>
    </div>
  );
};

export default Decks;
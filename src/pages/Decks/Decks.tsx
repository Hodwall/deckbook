import useDeckStore from '../../store/useDeckStore';
import Deck from '../../components/Deck/Deck';
import CreateDeckDialog from '../../components/CreateDeckDialog/CreateDeckDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Decks.css';
import useLibraryStore from '../../store/useLibraryStore';


const Decks = () => {
  const active_library = useLibraryStore((state) => state.active_library);
  const library = useLibraryStore((state) => state.libraries.find((library) => library.id === active_library));
  const decks = useDeckStore((state) => state.decks?.filter((deck) => deck.library_id === active_library));

  return (
    <div className="Decks">
      <img className="content-background" src={library?.background} />
      <div className="content-title">DECKS IN <span>{library?.label}</span></div>
      <div className="sections"></div>
      <Toolbar>
        <CreateDeckDialog />
      </Toolbar>
      <div className="results">
        {
          library && decks.map((c) => <Deck data={c} />)
        }
      </div>
    </div>
  );
};

export default Decks;
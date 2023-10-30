import useDeckStore from '../../store/useDeckStore';
import useCollectionStore from '../../store/useCollectionStore';
import Deck from '../../components/Deck/Deck';
import CreateDeckDialog from '../../components/CreateDeckDialog/CreateDeckDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Decks.css';


const Decks = () => {
  const active_collection = useCollectionStore((state) => state.active_collection);
  const collection = useCollectionStore((state) => state.collections.find((collection) => collection.id === active_collection));
  const decks = useDeckStore((state) => state.decks?.filter((deck) => deck.collection_id === active_collection));

  return (
    <div className="Decks">
      <img className="background" src={collection?.background} />
      <div className="title">DECKS IN <span>{collection?.label}</span></div>
      <div className="sections"></div>
      <Toolbar>
        <CreateDeckDialog />
      </Toolbar>
      <div className="results">
        {
          collection && decks.map((c) => <Deck data={c} />)
        }
      </div>
    </div>
  );
};

export default Decks;
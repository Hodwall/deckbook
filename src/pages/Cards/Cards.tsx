import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import Card from '../../components/Card/Card';
import CreateCardDialog from '../../components/CreateCardDialog/CreateCardDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Cards.css';


const Cards = () => {
  const active_collection = useCollectionStore((state) => state.active_collection);
  const collection = useCollectionStore((state) => state.collections.find((c) => c.id === active_collection));
  const cards = useCardStore((state) => state.cards);
  const collection_cards = cards.filter((card) => card.collection_id === active_collection);

  return (
    <div className="Cards">
      <img className="background" src={collection?.background} />
      <div className="title">CARDS IN <span>{collection?.label}</span> COLLECTION</div>
      <div className="sections"></div>
      <Toolbar>
        <CreateCardDialog />
      </Toolbar>
      <div className="results">
        {
          collection_cards?.map((card) => <Card data={card} />)
        }
      </div>
    </div>
  );
};

export default Cards;
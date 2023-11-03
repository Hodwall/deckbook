import useDeckStore from "../../../store/useDeckStore";
import useCollectionStore from "../../../store/useCollectionStore";
import SideDeck from "./SideDeck";


const SideDecks = () => {
  const active_collection = useCollectionStore((state) => state.active_collection);
  const collection = useCollectionStore((state) => state.collections.find((collection) => collection.id === active_collection));
  const decks = useDeckStore((state) => state.decks?.filter((deck) => deck.collection_id === active_collection));
  const pinned_decks = decks.filter((d) => d.isPinned);

  return (
    <div className="SideDecks">
      {
        collection && pinned_decks.map((c) => <SideDeck data={c} />)
      }
    </div>
  );
};

export default SideDecks;
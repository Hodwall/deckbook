import useLibraryStore from "../../../store/useLibraryStore";
import useDeckStore from "../../../store/useDeckStore";
import Deck from "../../../components/Deck/Deck";


const PinnedDecks = () => {
  const active_library = useLibraryStore((state) => state.active_library);
  const [decks, active_deck, setActiveDeck] = useDeckStore((state) => [state.decks, state.active_deck, state.setActiveDeck]);
  const library_decks = decks.reduce((results: any[], deck: any) => {
    if (deck.library_id === active_library && deck.isPinned) {
      results.push(deck);
    }
    return results;
  }, []);

  const handlePin = (id: number) => {
    if (active_deck === id) {
      setActiveDeck(null);
    } else {
      setActiveDeck(id);
    }
  };

  return (
    <div className="PinnedDecks">
      {
        library_decks.map((deck) =>
          <Deck
            className={`${active_deck === deck.id ? 'pinned-active' : ''}`}
            data={deck}
            clickHandler={() => handlePin(deck.id)}
          />)
      }
    </div>
  );
};

export default PinnedDecks;
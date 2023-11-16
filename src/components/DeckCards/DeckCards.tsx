import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import useCollectionStore from '../../store/useCollectionStore';
import Card from '../../components/Card/Card';
import './DeckCards.css';


const DeckCards = () => {
  const active_deck = useDeckStore((state) => state.active_deck);
  const active_collection = useCollectionStore((state) => state.active_collection);
  const decks = useDeckStore((state) => state.decks);
  const cards = useCardStore((state) => state.cards);
  const deck = decks.find((d) => d.id === active_deck);

  const filtered_cards = cards.reduce((results: any[], card: any) => {
    if (card.collection_id === active_collection && deck) {
      let is_card_included = false;
      card.tags.forEach((card_tag: any) => {
        deck.tags.forEach((deck_tag) => {
          if (deck_tag.id === card_tag.id) {
            is_card_included = true;
          }
        });
      });
      if (is_card_included) {
        results.push(card);
      }
    }
    return results;
  }, []);

  console.log(filtered_cards, active_deck, active_collection, cards);

  return (
    <div className="DeckCards">
      {
        filtered_cards.map((card) => <Card data={card} />)
      }
    </div >
  );
};

export default DeckCards;
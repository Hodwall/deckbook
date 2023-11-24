import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import Card from '../../components/Card/Card';
import './DeckCards.css';


const DeckCards = () => {
  const active_deck = useDeckStore((state) => state.active_deck);
  const decks = useDeckStore((state) => state.decks);
  const cards = useCardStore((state) => state.cards);
  const deck = decks.find((d) => d.id === active_deck);

  const filtered_cards = cards.reduce((results: any[], card: any) => {
    if (deck) {
      let is_included = true;
      deck.tags.forEach((tag: string) => {
        if (!card.tags.includes(tag)) {
          is_included = false;
        }
      });
      if (is_included) results.push(card);
    }
    return results;
  }, []);

  return (
    <div className="DeckCards">
      {
        filtered_cards.map((card) => <Card data={card} />)
      }
    </div >
  );
};

export default DeckCards;
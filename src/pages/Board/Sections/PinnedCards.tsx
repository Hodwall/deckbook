import useCardStore from "../../../store/useCardStore";
import Card from "../../../components/Card/Card";


const PinnedCards = () => {
  const [cards] = useCardStore((state) => [state.cards]);
  const pinned_cards = cards.reduce((results: any[], item: any) => {
    if (item.isPinned) results.push(item);
    return results;
  }, []);

  return (
    <div className="PinnedCards">
      {
        pinned_cards.map((map) =>
          <Card
            data={map}
          />)
      }
    </div>
  );
};

export default PinnedCards;
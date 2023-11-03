import useCardStore from "../../store/useCardStore";
import CardStatsItem from "../CardStatsItem/CardStatsItem";
import Selector from "../Selector/Selector";
import './CardStats.css';


const CardStats = (props: {
  cardId: number;
}) => {
  const [cards, setCardType, setCardTypeData] = useCardStore((state) => [state.cards, state.setCardType, state.setCardTypeData]);
  const card = cards.find((c) => c.id === props.cardId);

  return (
    <div className="CardStats">
      <Selector
        defaultValue={card?.type}
        label={'Card Type'}
        options={['-', 'Item', 'Location', 'Spell']}
        onSelect={(type) => {
          setCardType(card?.id || -1, type);
          setCardTypeData(card?.id || -1, null);
        }}
      />
      {
        card?.type === 1 && <CardStatsItem cardId={props.cardId} />
      }
    </div>
  );
};

export default CardStats;
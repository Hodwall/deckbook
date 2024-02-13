import useCardStore from "../../store/useCardStore";
import CardStatsItem from "../CardStatsItem/CardStatsItem";
import Selector from "../Selector/Selector";
import './CardStats.css';


const CardStats = (props: {
  cardId: number;
}) => {
  const [cards, setCardType, setCardTypeData] = useCardStore((state) => [state.cards, state.setCardType, state.setCardTypeData]);
  const card = cards.find((c) => c.id === props.cardId);

  const options = ['-', 'item', 'location', 'spell'];

  return (
    <div className="CardStats">
      <Selector
        defaultValue={options.findIndex((o) => o === card?.type) || 0}
        label={'Card Type'}
        options={options}
        onSelect={(type) => {
          setCardType(card?.id || -1, options[type]);
          setCardTypeData(card?.id || -1, null);
        }}
      />
      {
        card?.type === 'item' && <CardStatsItem cardId={props.cardId} />
      }
    </div>
  );
};

export default CardStats;
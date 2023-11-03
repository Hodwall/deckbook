import useCardStore from "../../store/useCardStore";
import StatsItem from "./Components/StatsItem";
import './Card.css';


const Card = (props: {
  data: any,
}) => {
  const setActiveCard = useCardStore((state) => state.setActiveCard);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

  return (
    <div className="Card" style={style} onClick={() => setActiveCard(props.data.id)}>
      <div className={'label'}>
        <div>{props.data.label}</div>
        <div>{props.data.description}</div>
      </div>
      <div className={'stats'}>
        {(props.data.type === 1 && props.data.type_data) && <StatsItem data={props.data.type_data} />}
        {/* <div className="card-stat">24</div> */}
      </div>
    </div>

  );
};

export default Card;
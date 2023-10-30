import useCardStore from "../../store/useCardStore";
import { MdDelete } from 'react-icons/md';
import './Card.css';


const Card = (props: {
  data: any,
}) => {
  const deleteCard = useCardStore((state) => state.deleteCard);
  const setActiveCard = useCardStore((state) => state.setActiveCard);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteCard(props.data.id);
  };

  return (
    <div className="Card" style={style} onClick={() => setActiveCard(props.data.id)}>
      <div className={'label'}>
        <div>{props.data.label}</div>
        <div>{props.data.description}</div>
      </div>
      <div className={'stats'}>
        {/* <div className="card-stat">24</div> */}
      </div>
    </div>

  );
};

export default Card;
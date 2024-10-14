import useCardStore from "../../store/useCardStore";
import styles from './Card.module.css';


const Card = (props: {
  data: any,
  onClick?: (card: any) => void,
}) => {
  const setActiveCard = useCardStore((state) => state.setActiveCard);
  const setActiveWideCard = useCardStore((state) => state.setActiveWideCard);
  const style = props.data.background ? { backgroundImage: `url(${props.data.background})` } : {};

  const handleClick = () => {
    if (props.onClick) props.onClick(props.data);
    else {
      props.data.isWide ? setActiveWideCard(props.data.id) : setActiveCard(props.data.id);
    }
  };

  return (
    <div className={`${styles.Card} ${props.data.isWide && styles.Card__wide}`} onClick={handleClick}>
      <div className={styles.content}>
        {/* <div className="card-type">CHARACTER</div> */}
        <div className={styles.label}>{props.data.label}</div>
        <div className={styles.description}>{props.data.description}</div>
      </div>
      <div className={styles.bgImage} style={style} />
    </div >
  );
};

export default Card;;
import { BsFillPinAngleFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import styles from './Deck.module.css';
import UpdateDeckDialog from './UpdateDeckDialog';


const Deck = (props: {
  data: any,
  clickHandler?: any,
  className?: string,
  useCloseButton?: boolean,
  disableNavigation?: boolean,
}) => {
  const navigate = useNavigate();
  const [deleteDeck, togglePinDeck] = useDeckStore((state) => [state.deleteDeck, state.togglePinDeck]);
  const style = props.data.background ? { backgroundImage: `url(${props.data.background})` } : {};
  const cards = useCardStore((state) => state.cards);
  const deck_cards = cards.reduce((results: any[], card: any) => {
    let is_included = true;
    props.data.tags.forEach((tag: string) => {
      if (!card.tags.includes(tag)) {
        is_included = false;
      }
    });
    if (is_included) results.push(card);
    return results;
  }, []);

  const handlePin = (e: any) => {
    e.stopPropagation();
    togglePinDeck(props.data.id);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteDeck(props.data.id);
  };

  const handleNavigation = () => {
    if (!props.disableNavigation) navigate(`/deckbook/cards?deck=${props.data.id}`);
  };

  return (
    <div className={styles.Deck} style={style} onClick={props.clickHandler ?? handleNavigation}>
      <div className={styles.tools}>
        <UpdateDeckDialog id={props.data.id} />
        <button className={`transparent-button ${props.data.isPinned ? 'active' : ''}`} onClick={handlePin}><BsFillPinAngleFill /></button>
        <button className="transparent-button red" onClick={handleDelete}><MdDelete /></button>
        {props.useCloseButton && <button className="transparent-button" onClick={() => navigate('/deckbook/decks')}>x</button>}
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.infoPanel__label}> {props.data.label} </div>
        <div className={styles.infoPanel__stats}>
          {deck_cards.length || 'No'} {deck_cards.length === 1 ? 'card' : 'cards'}
        </div>
      </div>
    </div>
  );
};

export default Deck;
import useDeckStore from '../../store/useDeckStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete } from 'react-icons/md';
import { BsFillPinAngleFill } from 'react-icons/bs';
import './Deck.css';
import useCardStore from '../../store/useCardStore';


const Deck = (props: {
  data: any,
  clickHandler?: any,
  className?: string,
}) => {
  const [deleteDeck, setActiveDeck, togglePinDeck] = useDeckStore((state) => [state.deleteDeck, state.setActiveDeck, state.togglePinDeck]);
  const setSection = useNavigationStore((state) => state.setSection);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

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

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteDeck(props.data.id);
  };

  const handleNavigation = () => {
    setActiveDeck(props.data.id);
    setSection('deck-display');
  };

  const handlePin = (e: any) => {
    e.stopPropagation();
    togglePinDeck(props.data.id);
  };

  return (
    <div className={`Deck ${props.className}`} style={style} onClick={props.clickHandler ?? handleNavigation}>
      <div className={'tools'}>
        <button onClick={handleDelete}><MdDelete /></button>
        <button onClick={handlePin} className={`${props.data.isPinned ? 'active' : ''}`}><BsFillPinAngleFill /></button>
      </div>
      <div className="info">
        <div className="label">
          {props.data.label}
        </div>
        <div className="description">
          {props.data.description}
        </div>
        <div className="stats">
          {deck_cards.length || 'No'} {deck_cards.length === 1 ? 'card' : 'cards'}
        </div>
      </div>
    </div>
  );
};

export default Deck;
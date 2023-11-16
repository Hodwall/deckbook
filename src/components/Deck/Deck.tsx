import useDeckStore from '../../store/useDeckStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete } from 'react-icons/md';
import { BsFillPinAngleFill } from 'react-icons/bs';
import './Deck.css';


const Deck = (props: {
  data: any,
}) => {
  const [deleteDeck, setActiveDeck, togglePinDeck] = useDeckStore((state) => [state.deleteDeck, state.setActiveDeck, state.togglePinDeck]);
  const setSection = useNavigationStore((state) => state.setSection);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

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
    <div className="Deck" style={style} onClick={handleNavigation}>
      <div className={'tools'}>
        <button onClick={handleDelete}><MdDelete /></button>
        <button onClick={handlePin} className={`${props.data.isPinned ? 'active' : ''}`}><BsFillPinAngleFill /></button>
      </div>
      <div className={'label'}>{props.data.label}</div>
    </div>
  );
};

export default Deck;
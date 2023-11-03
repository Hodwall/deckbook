import useDeckStore from '../../../store/useDeckStore';
import { BsFillPinAngleFill } from 'react-icons/bs';


const SideDeck = (props: {
  data: any,
}) => {
  const [active_deck, setActiveDeck, togglePinDeck] = useDeckStore((state) => [state.active_deck, state.setActiveDeck, state.togglePinDeck]);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};


  const handleClick = () => {
    if (props.data.id === active_deck) {
      setActiveDeck(null);
    } else {
      setActiveDeck(props.data.id);
    }
  };

  const handlePin = (e: any) => {
    e.stopPropagation();
    togglePinDeck(props.data.id);
  };

  return (
    <div className={`SideDeck ${props.data.id === active_deck ? 'active' : ''}`} style={style} onClick={handleClick}>
      <div className={'tools'}>
        <button onClick={handlePin}><BsFillPinAngleFill /></button>
      </div>
      <div className={'label'}>{props.data.label}</div>
    </div>
  );
};

export default SideDeck;
import useDeckStore from '../../store/useDeckStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete } from 'react-icons/md';
import './Deck.css';


const Deck = (props: {
  data: any,
}) => {
  const [deleteDeck, setActiveDeck] = useDeckStore((state) => [state.deleteDeck, state.setActiveDeck]);
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

  return (
    <div className="Deck" style={style} onClick={handleNavigation}>
      <div className={'tools'}>
        <button onClick={handleDelete}><MdDelete /></button>
      </div>
      <div className={'label'}>{props.data.label}</div>
    </div>
  );
};

export default Deck;
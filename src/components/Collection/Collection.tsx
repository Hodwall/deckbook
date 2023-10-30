import useCollectionStore from '../../store/useCollectionStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete } from 'react-icons/md';
import './Collection.css';


const Collection = (props: {
  data: any,
}) => {
  const [setActiveCollection, deleteCollection] = useCollectionStore((state) => [state.setActiveCollection, state.deleteCollection]);
  const setSection = useNavigationStore((state) => state.setSection);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteCollection(props.data.id);
  };

  const handleNavigation = () => {
    setActiveCollection(props.data.id);
    setSection('decks');
  };

  return (
    <div className="Collection" style={style} onClick={handleNavigation}>
      <div className="tools">
        <button onClick={handleDelete}><MdDelete /></button>
      </div>
      <div className="label">
        {props.data.label}
      </div>
    </div>
  );
};

export default Collection;
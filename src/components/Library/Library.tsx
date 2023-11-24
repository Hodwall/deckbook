import useLibraryStore from '../../store/useLibraryStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete } from 'react-icons/md';
import './Library.css';


const Library = (props: {
  data: any,
}) => {
  const [setActiveLibrary, deleteLibrary] = useLibraryStore((state) => [state.setActiveLibrary, state.deleteLibrary]);
  const setSection = useNavigationStore((state) => state.setSection);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteLibrary(props.data.id);
  };

  const handleNavigation = () => {
    console.log(props.data.id);
    setActiveLibrary(props.data.id);
    setSection('board');
  };

  return (
    <div className="Library" style={style} onClick={handleNavigation}>
      <div className="tools">
        <button className="red" onClick={handleDelete}><MdDelete /></button>
      </div>
      <div className="label">
        {props.data.label}
      </div>
    </div>
  );
};

export default Library;
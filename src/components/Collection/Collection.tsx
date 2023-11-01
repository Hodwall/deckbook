import { useState, useEffect } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import useNavigationStore from '../../store/useNavigationStore';
import { MdDelete, MdSave } from 'react-icons/md';
import './Collection.css';


const Collection = (props: {
  data: any,
  canExport?: boolean,
}) => {
  const [setActiveCollection, deleteCollection, addToExportQueue, removeFromExportQueue] = useCollectionStore((state) => [
    state.setActiveCollection,
    state.deleteCollection,
    state.addToExportQueue,
    state.removeFromExportQueue,
  ]);

  const setSection = useNavigationStore((state) => state.setSection);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};
  const [exportMode, setExportMode] = useState(false);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteCollection(props.data.id);
  };

  const handleNavigation = () => {
    setActiveCollection(props.data.id);
    setSection('decks');
  };

  const handleExportSelect = (e: any) => {
    e.stopPropagation();
    setExportMode(!exportMode);
  };

  useEffect(() => {
    if (exportMode) {
      addToExportQueue(props.data.id);
    } else {
      removeFromExportQueue(props.data.id);
    }
  }, [exportMode]);

  return (
    <div className="Collection" style={style} onClick={handleNavigation}>
      <div className="tools">
        {props.canExport && <button onClick={handleExportSelect} className={`${exportMode ? 'active' : ''}`}><MdSave /></button>}
        <button onClick={handleDelete}><MdDelete /></button>
      </div>
      <div className="label">
        {props.data.label}
      </div>
    </div>
  );
};

export default Collection;
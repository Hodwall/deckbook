import { useState, useEffect } from 'react';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import useNavigationStore from '../../store/useNavigationStore';
import UpdateCollectionDialog from '../UpdateCollectionDialog/UpdateCollectionDialog';
import { MdDelete, MdSave } from 'react-icons/md';
import './Collection.css';


const Collection = (props: {
  data: any,
  canExport?: boolean,
}) => {
  const setSection = useNavigationStore((state) => state.setSection);
  const [deleteCollection, addToExportQueue, removeFromExportQueue, setActiveCollection] = useCollectionStore((state) => [
    state.deleteCollection,
    state.addToExportQueue,
    state.removeFromExportQueue,
    state.setActiveCollection
  ]);
  const cards = useCardStore((state) => state.cards);
  const collection_cards = cards.filter((c) => c.collection_id === props.data.id);
  const [exportMode, setExportMode] = useState(false);
  const style = props.data.background ? { background: `url(${props.data.background}), linear-gradient(150deg, hsl(0deg 6% 45%) 0%, hsl(0, 0%, 20%) 100%)` } : {};

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteCollection(props.data.id);
  };

  const handleExportSelect = (e: any) => {
    e.stopPropagation();
    setExportMode(!exportMode);
  };

  const handleNavigation = () => {
    setSection('collection-cards', props.data.id);
    setActiveCollection(props.data.id);
  };

  useEffect(() => {
    if (exportMode) {
      addToExportQueue(props.data.id);
    } else {
      removeFromExportQueue(props.data.id);
    }
  }, [exportMode]);

  return (
    <>
      <div className="Collection" style={style} onClick={handleNavigation}>
        <div className="tools">
          {props.canExport && <button onClick={handleExportSelect} className={`${exportMode ? 'active' : ''}`}><MdSave /></button>}
          <UpdateCollectionDialog id={props.data.id} />
          <button className="red" onClick={handleDelete}><MdDelete /></button>
        </div>
        <div className="info">
          <div className="label">
            {props.data.label}
          </div>
          <div className="description">
            {props.data.description}
          </div>
          <div className="stats">
            {collection_cards.length || 'No'} {collection_cards.length === 1 ? 'card' : 'cards'}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
import { useEffect, useState } from 'react';
import { MdDelete, MdSave } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useCardStore from '../../store/useCardStore';
import useSetStore from '../../store/useSetStore';
import UpdateSetDialog from './UpdateSetDialog';
import styles from './Set.module.css';


const Set = (props: {
  data: any,
  canExport?: boolean,
}) => {
  const navigate = useNavigate();
  const [deleteSet, addToExportQueue, removeFromExportQueue] = useSetStore((state) => [
    state.deleteSet,
    state.addToExportQueue,
    state.removeFromExportQueue
  ]);
  const cards = useCardStore((state) => state.cards);
  const set_cards = cards.filter((c) => c.set_id === props.data.id);
  const [exportMode, setExportMode] = useState(false);
  const style = props.data.background ? { backgroundImage: `url(${props.data.background})` } : {};

  useEffect(() => {
    if (exportMode) addToExportQueue(props.data.id);
    else removeFromExportQueue(props.data.id);
  }, [exportMode]);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteSet(props.data.id);
  };

  const handleExportSelect = (e: any) => {
    e.stopPropagation();
    setExportMode(!exportMode);
  };

  const handleNavigation = () => {
    navigate(`/deckbook/cards?set=${props.data.id}`);
  };

  return (
    <div className={styles.Set} style={style} onClick={handleNavigation}>
      <div className={styles.tools}>
        {props.canExport &&
          <button className={`transparent-button ${exportMode ? 'active' : ''}`} onClick={handleExportSelect} ><MdSave /></button>
        }
        <UpdateSetDialog id={props.data.id} />
        <button className="transparent-button red" onClick={handleDelete}><MdDelete /></button>
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.infoPanel__label}>{props.data.label}</div>
        <div className={styles.infoPanel__stats}>
          {set_cards.length || 'No'} {set_cards.length === 1 ? 'card' : 'cards'}
        </div>
      </div>
    </div>
  );
};

export default Set;
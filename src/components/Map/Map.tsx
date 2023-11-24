import useMapStore from '../../store/useMapStore';
import { MdDelete } from 'react-icons/md';
import './Map.css';


const Map = (props: {
  data: any,
}) => {
  const [setActiveMap, deleteMap] = useMapStore((state) => [state.setActiveMap, state.deleteMap]);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteMap(props.data.id);
  };

  return (
    <>
      <div className="Map" onClick={() => setActiveMap(props.data.id)}>
        <div className="tools">
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
            {/* {collection_cards.length || 'No'} {collection_cards.length === 1 ? 'card' : 'cards'} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
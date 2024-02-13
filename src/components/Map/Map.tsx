import { useState, useEffect } from 'react';
import useMapStore from '../../store/useMapStore';
import { MdDelete, MdSave } from 'react-icons/md';
import { BsFillPinAngleFill } from 'react-icons/bs';
import './Map.css';


const Map = (props: {
  data: any,
  canExport?: boolean,
}) => {
  const [setActiveMap, deleteMap, addToExportQueue, removeFromExportQueue, togglePinMap] = useMapStore((state) => [state.setActiveMap, state.deleteMap, state.addToExportQueue, state.removeFromExportQueue, state.togglePinMap]);
  const [exportMode, setExportMode] = useState(false);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteMap(props.data.id);
  };

  const handlePin = (e: any) => {
    e.stopPropagation();
    togglePinMap(props.data.id);
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
    <>
      <div className="Map" onClick={() => setActiveMap(props.data.id)}>
        <div className="tools">
          {props.canExport && <button onClick={handleExportSelect} className={`${exportMode ? 'active' : ''}`}><MdSave /></button>}
          <button className="red" onClick={handleDelete}><MdDelete /></button>
          <button onClick={handlePin} className={`${props.data.isPinned ? 'active' : ''}`}><BsFillPinAngleFill /></button>
        </div>
        <div className="info">
          <div className="label">
            {props.data.label}
          </div>
          <div className="stats">
            <div>Width: {props.data.width}</div>
            <div>Height: {props.data.height}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
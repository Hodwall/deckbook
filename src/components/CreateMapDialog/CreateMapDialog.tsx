import { useState } from 'react';
import useMapStore from '../../store/useMapStore';
import Dialog from "../Dialog/Dialog";
import { FaMap } from "react-icons/fa";
import './CreateMapDialog.css';


const CreateMapDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addMap = useMapStore((state) => state.addMap);

  const handleCreate = () => {
    if (label !== '') {
      addMap({
        id: Date.now(),
        label: label,
        background: background,
        hexes: {},
        width: 16,
        height: 16
      });
      setLabel('');
      setBackground('');
      setShowDialog(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>CREATE MAP</button>
      <Dialog
        className={'CreateMapDialog'}
        label={'NEW MAP'}
        icon={<FaMap />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <button onClick={handleCreate} disabled={label === ''}>
            CREATE
          </button>
        }
      >
        <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
        <div className={'input-label'}>Map name</div>
        {/* <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
        <div className={'input-label'}>Background URL</div> */}
      </Dialog >
    </>
  );
};

export default CreateMapDialog;
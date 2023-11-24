import { useState } from 'react';
import useDeckStore from '../../store/useDeckStore';
import useLibraryStore from '../../store/useLibraryStore';
import Dialog from "../Dialog/Dialog";
import { MdLayers } from 'react-icons/md';
import './CreateDeckDialog.css';


const CreateDeckDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addDeck = useDeckStore((state) => state.addDeck);
  const active_library = useLibraryStore((state) => state.active_library);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addDeck({
        id: Date.now(),
        library_id: active_library || 0,
        label: label,
        background: background,
        tags: [],
      });
      setLabel('');
      setBackground('');
      setShowDialog(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>CREATE DECK</button>
      <Dialog
        className={'CreateDeckDialog'}
        label={'NEW DECK'}
        icon={<MdLayers />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <button onClick={handleCreate} disabled={label === '' || background === ''}>
            CREATE
          </button>
        }
      >
        <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
        <div className={'input-label'}>Deck name</div>
        <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
        <div className={'input-label'}>Background URL</div>
      </Dialog >
    </>
  );
};

export default CreateDeckDialog;
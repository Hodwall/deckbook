import { useState } from 'react';
import useDeckStore from '../../store/useDeckStore';
import useCollectionStore from '../../store/useCollectionStore';
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import { MdLayers } from 'react-icons/md';
import './CreateDeckDialog.css';


const CreateDeckDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addDeck = useDeckStore((state) => state.addDeck);
  const active_collection = useCollectionStore((state) => state.active_collection);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addDeck({
        id: Date.now(),
        collection_id: active_collection || 0,
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
      <Button onClick={() => setShowDialog(true)}>CREATE DECK</Button>
      <Dialog
        className={'CreateDeckDialog'}
        label={'NEW DECK'}
        icon={<MdLayers />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <Button onClick={handleCreate} disabled={label === '' || background === ''}>
            CREATE
          </Button>
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
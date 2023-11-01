import { useState } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import { MdAutoStories } from 'react-icons/md';
import './CreateCollectionDialog.css';


const CreateCollectionDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addCollection = useCollectionStore((state) => state.addCollection);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addCollection({
        id: Date.now(),
        label: label,
        background: background,
        decks: [],
        cards: []
      });
      setLabel('');
      setBackground('');
      setShowDialog(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>CREATE COLLECTION</button>
      <Dialog
        className={'CreateCollectionDialog'}
        label={'NEW COLLECTION'}
        icon={<MdAutoStories />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <Button onClick={handleCreate} disabled={label === '' || background === ''}>
            CREATE
          </Button>
        }
      >
        <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
        <div className={'input-label'}>Collection name</div>
        <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
        <div className={'input-label'}>Background URL</div>
      </Dialog >
    </>
  );
};

export default CreateCollectionDialog;
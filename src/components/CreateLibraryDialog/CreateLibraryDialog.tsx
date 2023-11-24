import { useState } from 'react';
import useLibraryStore from '../../store/useLibraryStore';
import Dialog from "../Dialog/Dialog";
import { MdAutoStories } from 'react-icons/md';
import './CreateLibraryDialog.css';


const CreateLibraryDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addLibrary = useLibraryStore((state) => state.addLibrary);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addLibrary({
        id: Date.now(),
        label: label,
        background: background,
        decks: [],
      });
      setLabel('');
      setBackground('');
      setShowDialog(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>CREATE LIBRARY</button>
      <Dialog
        className={'CreateLibraryDialog'}
        label={'NEW LIBRARY'}
        icon={<MdAutoStories />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <button onClick={handleCreate} disabled={label === '' || background === ''}>
            CREATE
          </button>
        }
      >
        <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
        <div className={'input-label'}>Library name</div>
        <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
        <div className={'input-label'}>Background URL</div>
      </Dialog >
    </>
  );
};

export default CreateLibraryDialog;
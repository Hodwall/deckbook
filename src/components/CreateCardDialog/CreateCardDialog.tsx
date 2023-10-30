import { useState, useEffect } from 'react';
import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import useCollectionStore from '../../store/useCollectionStore';
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import { MdWebStories } from 'react-icons/md';
import './CreateCardDialog.css';


const CreateCardDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

  const active_collection = useCollectionStore((state) => state.active_collection);
  const active_deck = useDeckStore((state) => state.active_deck);
  const addCard = useCardStore((state) => state.addCard);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addCard({
        id: Date.now(),
        collection_id: active_collection || -1,
        label: label,
        description: description,
        background: background,
        decks: active_deck ? [active_deck] : [],
        tags: [],
        content: null,
      });
      setShowDialog(false);
    }
  };

  useEffect(() => {
    setLabel('');
    setDescription('');
    setBackground('');
  }, [showDialog]);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>CREATE CARD</Button>
      <Dialog
        className={'CreateCardDialog'}
        label={'NEW CARD'}
        icon={<MdWebStories />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <Button onClick={handleCreate} disabled={label === '' || background === ''}>
            CREATE
          </Button>
        }
      >
        <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
        <div className={'input-label'}>Card name</div>
        <input value={description} onChange={(e: any) => setDescription(e.target.value)} />
        <div className={'input-label'}>Card description</div>
        <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
        <div className={'input-label'}>Background URL</div>
      </Dialog >
    </>
  );
};

export default CreateCardDialog;
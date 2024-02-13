import { useState, useEffect } from 'react';
import useCardStore from '../../store/useCardStore';
import Dialog from "../Dialog/Dialog";
import { MdWebStories } from 'react-icons/md';
import './UpdateCardDialog.css';


const UpdateCardDialog = (props: {
  cardId: number,
}) => {
  const active_card = useCardStore((state) => state.active_card);
  const cards = useCardStore((state) => state.cards);
  const card = cards.find((c) => c.id === props.cardId);
  const updateCard = useCardStore((state) => state.updateCard);

  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

  const handleUpdate = () => {
    updateCard(props.cardId, label, description, background, card?.collection_id || -1);
    setShowDialog(false);
  };

  useEffect(() => {
    if (!showDialog) {
      setLabel('');
      setDescription('');
      setBackground('');
    } else {
      if (card) {
        setLabel(card.label);
        setDescription(card.description);
        setBackground(card.background);
      }
    }
  }, [showDialog]);

  useEffect(() => {
    if (card) {
      setLabel(card.label);
      setDescription(card.description);
      setBackground(card.background);
    }
  }, [card]);

  useEffect(() => {
    setShowDialog(false);
  }, [active_card]);

  return (
    <>
      <button onClick={() => setShowDialog(true)}>EDIT</button>
      <Dialog
        className={'CreateCardDialog'}
        label={'EDIT'}
        icon={<MdWebStories />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <>
            <button onClick={handleUpdate} disabled={label === '' || background === ''}>
              SAVE CHANGES
            </button>
            <button onClick={() => setShowDialog(false)} >
              CANCEL
            </button>
          </>
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

export default UpdateCardDialog;
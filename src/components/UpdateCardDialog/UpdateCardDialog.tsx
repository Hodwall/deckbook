import { useState, useEffect } from 'react';
import useCardStore from '../../store/useCardStore';
import Button from "../Button/Button";
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
    updateCard(props.cardId, label, description, background);
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
    console.log(card?.id);
    if (card) {
      console.log('updating');
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
      <Button onClick={() => setShowDialog(true)}>EDIT CARD</Button>
      <Dialog
        className={'CreateCardDialog'}
        label={'EDIT CARD'}
        icon={<MdWebStories />}
        display={showDialog}
        setDisplay={setShowDialog}
        tools={
          <>
            <Button onClick={handleUpdate} disabled={label === '' || background === ''}>
              SAVE CHANGES
            </Button>
            <Button onClick={() => setShowDialog(false)} >
              CANCEL
            </Button>
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
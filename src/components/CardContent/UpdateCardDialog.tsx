import { useState } from 'react';
import { MdSettings } from "react-icons/md";
import dialogStyles from '../../components/Dialog/Dialog.module.css';
import useCardStore from '../../store/useCardStore';
import Dialog from "../Dialog/Dialog";


const UpdateCardDialog = (props: {
  id: number,
}) => {
  const cards = useCardStore((state) => state.cards);
  const card = cards.find((c) => c.id === props.id);
  const updateCard = useCardStore((state) => state.updateCard);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [backgroundAlt, setBackgroundAlt] = useState<string | undefined>(undefined);

  return (
    <>
      <Dialog
        backgroundImage={background}
        height={'40em'}
        width={'27em'}
        trigger={<button><MdSettings /></button>}
        onDisplay={() => {
          setLabel(card ? card.label : '');
          setDescription(card ? card.description : '');
          setBackground(card ? card.background : '');
          setBackgroundAlt(card ? card.background_alt : undefined);
        }}
        tools={
          [
            { label: 'CANCEL', onClick: () => { }, dismissDialog: true },
            { label: 'UPDATE CARD', onClick: () => updateCard(props.id, label, description, background, backgroundAlt, card?.set_id || -1), disabled: label === '' || background === '', dismissDialog: true },
          ]
        }
      >
        <div className={dialogStyles.form}>
          <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
          <div className={dialogStyles.form__label}>Card name</div>
          <input value={description} onChange={(e: any) => setDescription(e.target.value)} />
          <div className={dialogStyles.form__label}>Card description</div>
          <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
          <div className={dialogStyles.form__label}>
            Background URL
            <span className={dialogStyles.btn} onClick={() => setBackground('')}>CLEAR</span>
          </div>
          <input value={backgroundAlt} onChange={(e: any) => setBackgroundAlt(e.target.value)} />
          <div className={dialogStyles.form__label}>
            Alternate Background URL
            <span className={dialogStyles.btn} onClick={() => setBackgroundAlt(undefined)}>CLEAR</span>
          </div>
        </div>
      </Dialog >
    </>
  );
};

export default UpdateCardDialog;
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import dialogStyles from '../../components/Dialog/Dialog.module.css';
import useDeckStore from '../../store/useDeckStore';
import Dialog from "../Dialog/Dialog";


const UpdateDeckDialog = (props: {
  id: number,
}) => {
  const decks = useDeckStore((state) => state.decks);
  const deck = decks.find((c) => c.id === props.id);
  const updateDeck = useDeckStore((state) => state.updateDeck);

  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');

  return (
    <>
      {
        <Dialog
          label={'UPDATE DECK'}
          backgroundImage={background}
          height={'30em'}
          width={'28em'}
          trigger={<button className="transparent-button"><MdEdit /></button>}
          onDisplay={() => {
            setLabel(deck ? deck.label : '');
            setBackground(deck ? deck.background : '');
          }}
          tools={
            [
              { label: 'CANCEL', onClick: () => { }, dismissDialog: true },
              { label: 'UPDATE', onClick: () => updateDeck(props.id, label, background), disabled: label === '' || background === '', dismissDialog: true },
            ]
          }
        >
          <div className={dialogStyles.form}>
            <input value={label} onChange={(e: any) => setLabel(e.target.value)} placeholder='Name ...' />
            <div className={dialogStyles.form__label}>Deck name</div>
            <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
            <div className={dialogStyles.form__label}>
              Background URL
              <span className={dialogStyles.btn} onClick={() => setBackground('')}>CLEAR</span>
            </div>
          </div>
        </Dialog >
      }
    </>
  );
};

export default UpdateDeckDialog;
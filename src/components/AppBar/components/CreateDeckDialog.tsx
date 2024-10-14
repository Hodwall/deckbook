import { useState } from 'react';
import useDeckStore from '../../../store/useDeckStore';
import Dialog from "../../Dialog/Dialog";
import styles from '../AppBar.module.css';
import dialogStyles from '../../../components/Dialog/Dialog.module.css';


const CreateDeckDialog = () => {
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const addDeck = useDeckStore((state) => state.addDeck);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      addDeck({
        id: Date.now(),
        label: label,
        background: background,
        tags: [],
      });
      setLabel('');
      setBackground('');
    }
  };

  return (
    <>
      <Dialog
        label={'CREATE NEW DECK'}
        backgroundImage={background}
        height={'30em'}
        width={'28em'}
        trigger={<button className={styles.AppBar__button}>CREATE DECK</button>}
        tools={[
          { label: 'CREATE NEW DECK', onClick: handleCreate, disabled: label === '' || background === '', dismissDialog: true }
        ]}
      >
        <div className={dialogStyles.form}>
          <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
          <div className={dialogStyles.form__label}>Deck name</div>
          <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
          <div className={dialogStyles.form__label}>Background URL</div>
        </div>
      </Dialog >
    </>
  );
};

export default CreateDeckDialog;
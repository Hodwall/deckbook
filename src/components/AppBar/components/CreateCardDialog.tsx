import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dialogStyles from '../../../components/Dialog/Dialog.module.css';
import useCardStore from '../../../store/useCardStore';
import Dialog from "../../Dialog/Dialog";
import styles from '../AppBar.module.css';


const CreateCardDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const set_id = searchParams.get('set');
  const addCard = useCardStore((state) => state.addCard);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [backgroundAlt, setBackgroundAlt] = useState('');

  const handleCreate = () => {
    if (set_id && label !== '' && background !== '') {
      addCard({
        id: Date.now(),
        set_id: +set_id,
        label: label,
        description: description,
        background: background,
        background_alt: backgroundAlt,
        tags: [],
        content: null,
        linked_cards: []
      });
    }
  };

  return (
    <>
      <Dialog
        backgroundImage={background}
        height={'40em'}
        width={'27em'}
        disabled={!set_id}
        onDisplay={() => {
          setLabel('');
          setDescription('');
          setBackground('');
        }}
        trigger={<button className={styles.AppBar__button} disabled={!set_id}>CREATE CARD</button>}
        tools={[
          { label: 'CREATE NEW CARD', onClick: handleCreate, disabled: label === '' || background === '', dismissDialog: true }
        ]}
      >
        <div className={dialogStyles.form}>
          <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
          <div className={dialogStyles.form__label}>Card name</div>
          <input value={description} onChange={(e: any) => setDescription(e.target.value)} />
          <div className={dialogStyles.form__label}>Card description</div>
          <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
          <div className={dialogStyles.form__label}>Background URL</div>
          <input value={backgroundAlt} onChange={(e: any) => setBackgroundAlt(e.target.value)} />
          <div className={dialogStyles.form__label}>Alternate Background URL</div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCardDialog;
import { useState } from 'react';
import dialogStyles from '../../../components/Dialog/Dialog.module.css';
import useSetStore from '../../../store/useSetStore';
import Dialog from "../../Dialog/Dialog";
import styles from '../AppBar.module.css';


const CreateSetDialog = () => {
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');
  const createSet = useSetStore((state) => state.createSet);

  const handleCreate = () => {
    if (label !== '' && background !== '') {
      createSet({
        id: Date.now(),
        label: label,
        background: background,
        cards: []
      });
      setLabel('');
      setBackground('');
    }
  };

  return (
    <>
      <Dialog
        backgroundImage={background}
        height={'40em'}
        width={'19em'}
        trigger={<button className={styles.AppBar__button}>CREATE SET</button>}
        tools={[
          { label: 'CREATE A NEW SET', onClick: handleCreate, disabled: label === '' || background === '', dismissDialog: true }
        ]}
      >
        <div className={dialogStyles.form}>
          <input value={label} onChange={(e: any) => setLabel(e.target.value)} placeholder='Name ...' />
          <div className={dialogStyles.form__label}>Set name</div>
          <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
          <div className={dialogStyles.form__label}>
            Background URL
            <span className={dialogStyles.btn} onClick={() => setBackground('')}>CLEAR</span>
          </div>
        </div>
      </Dialog >
    </>
  );
};

export default CreateSetDialog;
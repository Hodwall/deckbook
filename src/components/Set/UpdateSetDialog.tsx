import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import dialogStyles from '../../components/Dialog/Dialog.module.css';
import useSetStore from '../../store/useSetStore';
import Dialog from "../Dialog/Dialog";


const UpdateSetDialog = (props: {
  id: number,
}) => {
  const sets = useSetStore((state) => state.sets);
  const set = sets.find((c) => c.id === props.id);
  const updateSet = useSetStore((state) => state.updateSet);

  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');


  return (
    <>
      {
        <Dialog
          label={'UPDATE SET'}
          backgroundImage={background}
          height={'40em'}
          width={'19em'}
          trigger={<button className="transparent-button"><MdEdit /></button>}
          onDisplay={() => {
            setLabel(set ? set.label : '');
            setBackground(set ? set.background : '');
          }}
          tools={
            [
              { label: 'CANCEL', onClick: () => { }, dismissDialog: true },
              { label: 'UPDATE SET', onClick: () => updateSet(props.id, label, background), disabled: label === '' || background === '', dismissDialog: true },
            ]
          }
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
      }
    </>
  );
};

export default UpdateSetDialog;
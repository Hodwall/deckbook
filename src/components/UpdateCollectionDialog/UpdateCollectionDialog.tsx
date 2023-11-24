import { useState, useEffect } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import Dialog from "../Dialog/Dialog";
import { MdWebStories, MdEdit } from 'react-icons/md';
import './UpdateCollectionDialog.css';


const UpdateCollectionDialog = (props: {
  id: number,
}) => {
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find((c) => c.id === props.id);
  const updateCollection = useCollectionStore((state) => state.updateCollection);

  const [showDialog, setShowDialog] = useState(false);
  const [label, setLabel] = useState('');
  const [background, setBackground] = useState('');

  const handleUpdate = (e: any) => {
    updateCollection(props.id, label, background);
    setShowDialog(false);
  };

  useEffect(() => {
    if (!showDialog) {
      setLabel('');
      setBackground('');
    } else {
      if (collection) {
        setLabel(collection.label);
        setBackground(collection.background);
      }
    }
  }, [showDialog]);

  useEffect(() => {
    if (collection) {
      setLabel(collection.label);
      setBackground(collection.background);
    }
  }, [collection]);

  return (
    <>
      <button
        onClick={(e: any) => {
          e.stopPropagation();
          setShowDialog(true);
        }}
      >
        <MdEdit />
      </button>
      {
        <Dialog
          className={'CreateCollectionDialog'}
          label={'EDIT COLLECTION'}
          icon={<MdWebStories />}
          display={showDialog}
          setDisplay={setShowDialog}
          tools={
            <>
              <button onClick={handleUpdate} disabled={label === '' || background === ''}>
                SAVE CHANGES
              </button>
              <button onClick={(e: any) => {
                setShowDialog(false);
              }} >
                CANCEL
              </button>
            </>
          }
        >
          <input value={label} onChange={(e: any) => setLabel(e.target.value)} />
          <div className={'input-label'}>Collection name</div>
          <input value={background} onChange={(e: any) => setBackground(e.target.value)} />
          <div className={'input-label'}>Background URL</div>
        </Dialog >
      }
    </>
  );
};

export default UpdateCollectionDialog;
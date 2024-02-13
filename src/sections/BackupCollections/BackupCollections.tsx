import { useState, useRef } from 'react';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import useTagStore from '../../store/useTagStore';
import { MdInsertDriveFile, MdOutlineInsertDriveFile } from 'react-icons/md';
import './BackupCollections.css';


const BackupCollections = () => {
  const selected_collections = useCollectionStore((state) => state.export_queue);
  const emptyExportQueue = useCollectionStore((state) => state.emptyExportQueue);

  const updateCollections = useCollectionStore((state) => state.updateCollections);
  const updateCards = useCardStore((state) => state.updateCards);
  const updateTags = useTagStore((state) => state.updateTags);

  const collections = useCollectionStore((state) => state.collections);
  const cards = useCardStore((state) => state.cards);
  const tags = useTagStore((state) => state.tags);

  const [saveFile, setSaveFile] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const exportCollections = (collection_list: number[]) => {
    const data: any = {
      collections: [],
      cards: [],
      tags: []
    };
    collection_list.forEach((collection_id) => {
      const collection = collections.find((c) => c.id === collection_id);
      if (collection) {
        const cards_in_collection = cards.filter((c) => c.collection_id === collection.id);
        const tags_in_collection = tags.filter((t) => t.collection_id === collection.id);
        data.collections.push(collection);
        data.cards.push(...cards_in_collection);
        data.tags.push(...tags_in_collection);
      }
    });
    var a = document.createElement("a");
    //@ts-ignore
    var file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = `deckbook-data-${Date.now()}.json`;
    a.click();
    emptyExportQueue();
  };

  const importCollections = () => {
    if (saveFile) {
      let reader = new FileReader();
      reader.readAsText(saveFile);
      reader.onload = (e: any) => {
        const new_data = JSON.parse(e.target.result);
        updateCollections(new_data.collections);
        updateCards(new_data.cards);
        updateTags(new_data.tags);
        setSaveFile(null);
        emptyExportQueue();
      };
    }
  };

  const handleExportCollections = () => {
    exportCollections(selected_collections);
  };

  const handleExportAllCollections = () => {
    exportCollections(collections.map((c: any) => c.id));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) setSaveFile(e.target.files[0]);
  };

  return (
    <div className="backup-collections">
      <div className="backup-load">
        <div className="backup-label">
          <div className="separator"></div><div className="label">LOAD</div><div className="separator"></div>
        </div>
        <div className="backup-content">
          <button onClick={() => inputRef.current?.click()}>
            {saveFile ? <span><MdInsertDriveFile />{saveFile.name}</span> : <span><MdOutlineInsertDriveFile />Select a file ...</span>}
          </button>
          <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".json" />
          <button onClick={importCollections} disabled={!saveFile}>LOAD</button>
          <button onClick={() => setSaveFile(null)} disabled={!saveFile}>CLEAR</button>
        </div>
      </div>
      <div className="backup-save">
        <div className="backup-label">
          <div className="separator"></div><div className="label">SAVE</div><div className="separator"></div>
        </div>
        <div className="backup-content">
          <button onClick={handleExportCollections} disabled={selected_collections.length < 1}>SAVE SELECTED COLLECTIONS</button>
          <button onClick={handleExportAllCollections}>SAVE ALL COLLECTIONS</button>
        </div>
      </div>

    </div>
  );
};

export default BackupCollections;;
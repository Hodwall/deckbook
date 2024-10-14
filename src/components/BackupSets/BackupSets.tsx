import { useState, useRef } from 'react';
import useCardStore from '../../store/useCardStore';
import useSetStore from '../../store/useSetStore';
import useTagStore from '../../store/useTagStore';
import { MdInsertDriveFile, MdOutlineInsertDriveFile } from 'react-icons/md';
import './BackupSets.css';


const BackupSets = () => {
  const selected_sets = useSetStore((state) => state.export_queue);
  const emptyExportQueue = useSetStore((state) => state.emptyExportQueue);

  const updateSets = useSetStore((state) => state.updateSets);
  const updateCards = useCardStore((state) => state.updateCards);
  const updateTags = useTagStore((state) => state.updateTags);

  const sets = useSetStore((state) => state.sets);
  const cards = useCardStore((state) => state.cards);
  const tags = useTagStore((state) => state.tags);

  const [saveFile, setSaveFile] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const exportSets = (set_list: number[]) => {
    const data: any = {
      sets: [],
      cards: [],
      tags: []
    };
    set_list.forEach((set_id) => {
      const set = sets.find((c) => c.id === set_id);
      if (set) {
        const cards_in_set = cards.filter((c) => c.set_id === set.id);
        const tags_in_set = tags.filter((t) => t.set_id === set.id);
        data.sets.push(set);
        data.cards.push(...cards_in_set);
        data.tags.push(...tags_in_set);
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

  const importSets = () => {
    if (saveFile) {
      let reader = new FileReader();
      reader.readAsText(saveFile);
      reader.onload = (e: any) => {
        const new_data = JSON.parse(e.target.result);
        updateSets(new_data.sets);
        updateCards(new_data.cards);
        updateTags(new_data.tags);
        setSaveFile(null);
        emptyExportQueue();
      };
    }
  };

  const handleExportSets = () => {
    exportSets(selected_sets);
  };

  const handleExportAllSets = () => {
    exportSets(sets.map((c: any) => c.id));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) setSaveFile(e.target.files[0]);
  };

  return (
    <div className="backup-sets">
      <div className="backup-load">
        <div className="backup-label">
          <div className="separator"></div><div className="label">LOAD</div><div className="separator"></div>
        </div>
        <div className="backup-content">
          <button onClick={() => inputRef.current?.click()}>
            {saveFile ? <span><MdInsertDriveFile />{saveFile.name}</span> : <span><MdOutlineInsertDriveFile />Select a file ...</span>}
          </button>
          <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".json" />
          <button onClick={importSets} disabled={!saveFile}>LOAD</button>
          <button onClick={() => setSaveFile(null)} disabled={!saveFile}>CLEAR</button>
        </div>
      </div>
      <div className="backup-save">
        <div className="backup-label">
          <div className="separator"></div><div className="label">SAVE</div><div className="separator"></div>
        </div>
        <div className="backup-content">
          <button onClick={handleExportSets} disabled={selected_sets.length < 1}>SAVE SELECTED SETS</button>
          <button onClick={handleExportAllSets}>SAVE ALL SETS</button>
        </div>
      </div>

    </div>
  );
};

export default BackupSets;;
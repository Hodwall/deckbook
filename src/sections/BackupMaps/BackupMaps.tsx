import { useState, useRef } from 'react';
import useCardStore from '../../store/useCardStore';
import useMapStore from '../../store/useMapStore';
import useTagStore from '../../store/useTagStore';
import { MdInsertDriveFile, MdOutlineInsertDriveFile } from 'react-icons/md';
import './BackupMaps.css';


const BackupMaps = () => {
  const selected_maps = useMapStore((state) => state.export_queue);
  const emptyExportQueue = useMapStore((state) => state.emptyExportQueue);
  const updateMaps = useMapStore((state) => state.updateMaps);
  const maps = useMapStore((state) => state.maps);

  const [saveFile, setSaveFile] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const exportMaps = (map_list: number[]) => {
    const data: any = { maps: [] };
    map_list.forEach((map_id) => {
      const map = maps.find((m) => m.id === map_id);
      if (map) data.maps.push(map);
    });
    var a = document.createElement("a");
    //@ts-ignore
    var file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = `deckbook-data-maps-${Date.now()}.json`;
    a.click();
    emptyExportQueue();
  };

  const importCollections = () => {
    if (saveFile) {
      let reader = new FileReader();
      reader.readAsText(saveFile);
      reader.onload = (e: any) => {
        const new_data = JSON.parse(e.target.result);
        if (new_data.maps) {
          updateMaps(new_data.maps);
          setSaveFile(null);
          emptyExportQueue();
        }
      };
    }
  };

  const handleExportMaps = () => {
    exportMaps(selected_maps);
  };

  const handleExportAllMaps = () => {
    exportMaps(maps.map((m: any) => m.id));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) setSaveFile(e.target.files[0]);
  };

  return (
    <div className="backup-maps">
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
          <button onClick={handleExportMaps} disabled={selected_maps.length < 1}>SAVE SELECTED MAPS</button>
          <button onClick={handleExportAllMaps}>SAVE ALL MAPS</button>
        </div>
      </div>
    </div>
  );
};

export default BackupMaps;;
import { useState } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import BackupCollections from '../../sections/BackupCollections/BackupCollections';
import Collection from '../../components/Collection/Collection';
import CreateCollectionDialog from '../../components/CreateCollectionDialog/CreateCollectionDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';
import './Collections.css';


const Collections = () => {
  const collections = useCollectionStore((state) => state.collections);
  const [section, setSection] = useState<string | null>(null);

  return (
    <div className="Collections">
      <img className="content-background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="content-title">COLLECTIONS</div>
      <ToolbarDrawer>
        {
          section === 'backup-collection' && <BackupCollections />
        }
      </ToolbarDrawer>
      <Toolbar>
        <CreateCollectionDialog />
        <button onClick={() => setSection(section ? null : 'backup-collection')} className={`${section === 'backup-collection' ? 'active' : ''}`} >LOAD / SAVE COLLECTIONS</button>
      </Toolbar>
      <div className="results">
        {
          collections?.map((c) => <Collection data={c} canExport={section === 'backup-collection'} />)
        }
      </div>
    </div>
  );
};

export default Collections;
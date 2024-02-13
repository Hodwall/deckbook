import { useState, useMemo } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import BackupCollections from '../../sections/BackupCollections/BackupCollections';
import Collection from '../../components/Collection/Collection';
import CreateCollectionDialog from '../../components/CreateCollectionDialog/CreateCollectionDialog';
import Selector from '../../components/Selector/Selector';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';
import './Collections.css';


const Collections = () => {
  const [sortingType, setSortingType] = useState<number>(0);
  const [section, setSection] = useState<string | null>(null);
  const collections = useCollectionStore((state) => state.collections);

  const sorted_collections = useMemo(() => {
    if (sortingType === 1) {
      return [...collections.toSorted((a, b) => a.label < b.label ? -1 : 1)];
    } else {
      return [...collections];
    }
  }, [sortingType, collections]);

  return (
    <div className="Collections">
      <img className="content-background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="content-title">COLLECTIONS</div>
      <ToolbarDrawer>
        {section === 'backup-collection' && <BackupCollections />}
      </ToolbarDrawer>
      <Toolbar>
        <CreateCollectionDialog />
        <button onClick={() => setSection(section ? null : 'backup-collection')} className={`${section === 'backup-collection' ? 'active' : ''}`} >LOAD / SAVE COLLECTIONS</button>
        <Selector
          className="selector-sort"
          defaultValue={0}
          options={['SORT: Creation Date', 'SORT: Alphabetical']}
          onSelect={(val) => setSortingType(val)}
        />
      </Toolbar>
      <div className="results">
        {
          sorted_collections?.map((c) => <Collection data={c} canExport={section === 'backup-collection'} />)
        }
      </div>
    </div>
  );
};

export default Collections;
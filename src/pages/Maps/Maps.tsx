import { useState, useMemo } from 'react';
import useMapStore from '../../store/useMapStore';
import BackupMaps from '../../sections/BackupMaps/BackupMaps';
import CreateMapDialog from '../../components/CreateMapDialog/CreateMapDialog';
import Map from '../../components/Map/Map';
import Selector from '../../components/Selector/Selector';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';
import './Maps.css';


const Maps = () => {
  const [sortingType, setSortingType] = useState<number>(0);
  const [section, setSection] = useState<string | null>(null);
  const maps = useMapStore((state) => state.maps);

  const sorted_maps = useMemo(() => {
    if (sortingType === 1) {
      return [...maps.toSorted((a, b) => a.label < b.label ? -1 : 1)];
    } else {
      return [...maps];
    }
  }, [sortingType, maps]);

  return (
    <div className="Maps">
      <img className="content-background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="content-title">MAPS</div>
      <ToolbarDrawer>
        {section === 'backup-maps' && <BackupMaps />}
      </ToolbarDrawer>
      <Toolbar>
        <CreateMapDialog />
        <button onClick={() => setSection(section ? null : 'backup-maps')} className={`${section === 'backup-maps' ? 'active' : ''}`} >LOAD / SAVE MAPS</button>
        <Selector
          className="selector-sort"
          defaultValue={0}
          options={['SORT: Creation Date', 'SORT: Alphabetical']}
          onSelect={(val) => setSortingType(val)}
        />
      </Toolbar>
      <div className="results">
        {
          sorted_maps?.map((m) => <Map data={m} canExport={section === 'backup-maps'} />)
        }
      </div>
    </div>
  );
};

export default Maps;
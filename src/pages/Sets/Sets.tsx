import { useState, useMemo } from 'react';
import useSetStore from '../../store/useSetStore';
import BackupSets from '../../components/BackupSets/BackupSets';
import Set from '../../components/Set/Set';
import CreateSetDialog from '../../components/AppBar/components/CreateSetDialog';
import Selector from '../../components/Selector/Selector';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Sets.css';


const Sets = () => {
  const sets = useSetStore((state) => state.sets);
  const [section, setSection] = useState<string | null>(null);
  const [sortingType, setSortingType] = useState<number>(0);

  const sorted_sets = useMemo(() => {
    return (sortingType === 1)
      ? [...sets.toSorted((a, b) => a.label < b.label ? -1 : 1)]
      : [...sets];
  }, [sortingType, sets]);

  return (
    <div className="Sets">
      <Toolbar
        startElements={[
          <Selector
            className="selector-sort"
            defaultValue={0}
            options={['SORT: Creation Date', 'SORT: Alphabetical']}
            onSelect={(val) => setSortingType(val)}
          />,
          {
            label: 'LOAD / SAVE SETS',
            onClick: () => setSection(section ? null : 'backup-set'),
            content: <BackupSets />
          },
        ]}
      />
      <div className="section-title small">SETS</div>
      <div className="section-separator" />
      <div className="results">
        {
          sorted_sets?.map((c) => <Set data={c} canExport={section === 'backup-set'} />)
        }
      </div>
    </div>
  );
};

export default Sets;
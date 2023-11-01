import { useState } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import BackupCollections from '../../sections/BackupCollections/BackupCollections';
import Button from '../../components/Button/Button';
import Collection from '../../components/Collection/Collection';
import CreateCollectionDialog from '../../components/CreateCollectionDialog/CreateCollectionDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import CustomSection from '../../components/Section/Section';
import './Collections.css';


const Collections = () => {
  const collections = useCollectionStore((state) => state.collections);
  const [section, setSection] = useState<string | null>(null);

  return (
    <div className="Collections">
      <img className="background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="title">COLLECTIONS</div>
      <CustomSection>
        {
          (() => {
            switch (section) {
              case 'backup-collection':
                return <BackupCollections />;
            }
          })()
        }
      </CustomSection>
      <Toolbar>
        <CreateCollectionDialog />
        <Button onClick={() => setSection(section ? null : 'backup-collection')} >LOAD / SAVE COLLECTIONS</Button>
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
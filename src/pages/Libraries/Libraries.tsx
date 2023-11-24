import { useState } from 'react';
import useCollectionStore from '../../store/useCollectionStore';
import useLibraryStore from '../../store/useLibraryStore';
import BackupCollections from '../../sections/BackupCollections/BackupCollections';
import Collection from '../../components/Collection/Collection';
import CreateCollectionDialog from '../../components/CreateCollectionDialog/CreateCollectionDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarDrawer from '../../components/ToolbarDrawer/ToolbarDrawer';

import Library from '../../components/Library/Library';
import CreateLibraryDialog from '../../components/CreateLibraryDialog/CreateLibraryDialog';

import './Libraries.css';


const Libraries = () => {
  const libraries = useLibraryStore((state) => state.libraries);

  return (
    <div className="Libraries">
      <img className="content-background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="content-title">LIBRARIES</div>
      <Toolbar>
        <CreateLibraryDialog />
      </Toolbar>
      <div className="results">
        {
          libraries?.map((l) => <Library data={l} />)
        }
      </div>
    </div>
  );
};

export default Libraries;
import { useState } from 'react';
import useMapStore from '../../store/useMapStore';
import Toolbar from '../../components/Toolbar/Toolbar';
import CreateMapDialog from '../../components/CreateMapDialog/CreateMapDialog';
import Map from '../../components/Map/Map';
import './Maps.css';



const Maps = () => {
  const maps = useMapStore((state) => state.maps);

  return (
    <div className="Maps">
      <img className="content-background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="content-title">MAPS</div>
      <Toolbar>
        <CreateMapDialog />
      </Toolbar>
      <div className="results">
        {
          maps?.map((m) => <Map data={m} />)
        }
      </div>
    </div>
  );
};

export default Maps;
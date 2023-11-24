import useMapStore from '../../store/useMapStore';
import { useSpring, animated } from 'react-spring';
import HexMap from '../HexMap/HexMap';
import './MapDisplay.css';


const MapDisplay = () => {
  const [maps, active_map, setActiveMap] = useMapStore((state) => [state.maps, state.active_map, state.setActiveMap]);
  const map = maps.find((m) => m.id === active_map);

  const animation = useSpring({
    y: active_map ? 0 : -20,
    rotateX: active_map ? 0 : -40,
    opacity: active_map ? 1 : 0,
    config: { mass: 15, friction: 220, tension: 4000 }
  });

  return (
    <animated.div
      className={`MapDisplay ${active_map ? '' : 'hidden'}`}
      style={{ ...animation }}
    >
      <div className="map-toolbar">
        <div className="label">{map?.label}</div>
        <div className="tools">
          <button onClick={() => setActiveMap(null)}>X</button>
        </div>
      </div>
      <div className="map-content">
        <HexMap />
      </div>
    </animated.div>
  );
};

export default MapDisplay;
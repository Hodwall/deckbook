import { useState, useRef } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern, HexUtils } from 'react-hexgrid';

import useMapStore from '../../store/useMapStore';
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";



import peak from '../../assets/hex_icons/mountain.png';
import mountains from '../../assets/hex_icons/mountains.png';
import hills from '../../assets/hex_icons/hills.png';
import grassyhills from '../../assets/hex_icons/grassyhills.png';
import forest from '../../assets/hex_icons/heavyforest.png';
import lightforest from '../../assets/hex_icons/lightforest.png';
import forestedhills from '../../assets/hex_icons/forestedhills.png';
import forestedmountains from '../../assets/hex_icons/forestedmountains.png';
import forestedpeak from '../../assets/hex_icons/forestedmountain.png';

import city from '../../assets/hex_icons/castle.png';
import tower from '../../assets/hex_icons/tower.png';
import village from '../../assets/hex_icons/village.png';
import temple from '../../assets/hex_icons/church.png';
import ruins from '../../assets/hex_icons/landmark.png';
import tribe from '../../assets/hex_icons/teepee.png';
import cave from '../../assets/hex_icons/cave.png';
import dungeon from '../../assets/hex_icons/dungeon.png';

import { ImZoomIn, ImZoomOut } from "react-icons/im";
import HexMapTool from './HexMapTool';

import './HexMap.css';

interface IHex { terrain?: string, feature?: string; };
interface IHexData { [key: string]: any; };


const HexMap = () => {
  const [maps, activeMap, updateMapHexes, updateMapSize] = useMapStore((state) => [state.maps, state.active_map, state.updateMapHexes, state.updateMapSize]);
  const map = maps.find((m) => m.id === activeMap);
  const [tool, setTool] = useState<{ id: string, type: string; } | null>(null);
  const [zoom, setZoom] = useState(true);
  const isClicking = useRef(false);

  if (!map) return <h1>no map</h1>;

  const hexes = GridGenerator.orientedRectangle(map.width, map.height);

  const terrain_icons: { [key: string]: any; } = {
    'peak': peak,
    'mountains': mountains,
    'hills': hills,
    'grassyhills': grassyhills,
    'forest': forest,
    'lightforest': lightforest,
    'forestedhills': forestedhills,
    'forestedmountains': forestedmountains,
    'forestedpeak': forestedpeak,
  };

  const feature_icons: { [key: string]: any; } = {
    'city': city,
    'tower': tower,
    'village': village,
    'temple': temple,
    'ruins': ruins,
    'tribe': tribe,
    'cave': cave,
    'dungeon': dungeon,
  };


  const handleHexData = (coords: string, value: any) => {
    let data = { ...map.hexes };
    const val_ = (value.type === 'feature' && data[coords]?.feature === value.id) ? null : value.id;
    let value_ = { [value.type]: val_ };
    data[coords] = { ...data[coords], ...value_ };
    updateMapHexes(map.id, { ...data });
  };

  const addHorizontalHexes = () => {
    updateMapSize(map.id, map.height, map.width + 2);
  };

  const removeHorizontalHexes = () => {
    updateMapSize(map.id, map.height, map.width - 2);
  };

  const addVerticalHexes = () => {
    updateMapSize(map.id, map.height + 2, map.width);
  };

  const removeVerticalHexes = () => {
    updateMapSize(map.id, map.height - 2, map.width);
  };

  const addColumnBefore = () => {
    let hexes_: IHexData = {};
    for (const key in map.hexes) {
      let coords: any = key.split('|');
      coords[0] = (coords[0] * 1) + 2;
      coords[1] = (coords[1] * 1) - 1;
      coords[2] = (coords[2] * 1) - 1;
      const new_coords = `${coords[0]}|${coords[1]}|${coords[2]}`;
      hexes_[new_coords] = map.hexes[key];
    }
    updateMapHexes(map.id, { ...hexes_ });
    updateMapSize(map.id, map.height, map.width + 2);
  };

  const removeColumnBefore = () => {
    let hexes_: IHexData = {};
    for (const key in map.hexes) {
      let coords: any = key.split('|');
      if (coords[0] <= 1) {
        hexes_[key] = null;
      } else {
        coords[0] = (coords[0] * 1) - 2;
        coords[1] = (coords[1] * 1) + 1;
        coords[2] = (coords[2] * 1) + 1;
        const new_coords = `${coords[0]}|${coords[1]}|${coords[2]}`;
        hexes_[new_coords] = { ...map.hexes[key] };
      }
    }
    updateMapHexes(map.id, { ...hexes_ });
    updateMapSize(map.id, map.height, map.width - 2);
  };

  const addRowBefore = () => {
    let hexes_: IHexData = {};
    for (const key in map.hexes) {
      let coords: any = key.split('|');
      coords[0] = coords[0] * 1;
      coords[1] = (coords[1] * 1) + 2;
      coords[2] = (coords[2] * 1) - 2;
      const new_coords = `${coords[0]}|${coords[1]}|${coords[2]}`;
      hexes_[new_coords] = { ...map.hexes[key] };
    }
    updateMapHexes(map.id, { ...hexes_ });
    updateMapSize(map.id, map.height + 2, map.width);
  };

  const removeRowBefore = () => {
    let hexes_: IHexData = {};
    for (const key in map.hexes) {
      let coords: any = key.split('|');
      coords[0] = coords[0] * 1;
      coords[1] = (coords[1] * 1) - 2;
      coords[2] = (coords[2] * 1) + 2;
      const new_coords = `${coords[0]}|${coords[1]}|${coords[2]}`;
      hexes_[new_coords] = map.hexes[key];
    }
    updateMapHexes(map.id, { ...hexes_ });
    updateMapSize(map.id, map.height - 2, map.width);
  };

  const zoom_factor = zoom ? 1 : 0.5;

  let existing_hexes = [];

  return (
    <div className="HexMap"
      onMouseDown={(e: any) => {
        console.log(e.button);
        if (e.button === 0) isClicking.current = true;
      }}
      onMouseUp={(e: any) => {
        if (e.button === 0) isClicking.current = false;
      }}
    >
      <div className="hex-map">
        <div className="hex-controls top">
          <button onClick={addRowBefore}><MdOutlineAddCircle /></button>
          <button onClick={removeRowBefore}><MdOutlineRemoveCircle /></button>
        </div>
        <div className="hex-controls right">
          <button onClick={addHorizontalHexes}><MdOutlineAddCircle /></button>
          <button onClick={removeHorizontalHexes}><MdOutlineRemoveCircle /></button>
        </div>
        <div className="hex-controls bottom">
          <button onClick={addVerticalHexes}><MdOutlineAddCircle /></button>
          <button onClick={removeVerticalHexes}><MdOutlineRemoveCircle /></button>
        </div>
        <div className="hex-controls left">
          <button onClick={addColumnBefore}><MdOutlineAddCircle /></button>
          <button onClick={removeColumnBefore}><MdOutlineRemoveCircle /></button>
        </div>
        <div className="HexGrid-container">
          <HexGrid id="HexGrid" width={`${((map.width * 50) + 70) * zoom_factor}px`} height={((map.height * 50) * zoom_factor)} viewBox={`0 0 ${map.width * 6} ${map.height * 6}`}>
            <Layout size={{ x: 4, y: 4 }}>
              {hexes.map((hex, i) => {
                let coords = `${hex.q}|${hex.r}|${hex.s}`;
                existing_hexes.push(coords);
                return (
                  <Hexagon
                    key={i}
                    q={hex.q}
                    r={hex.r}
                    s={hex.s}
                    className={map.hexes[coords]?.terrain}
                    onMouseDown={(e: any) => {
                      if (e.button === 0 && tool) handleHexData(coords, tool);
                    }}
                    onMouseEnter={() => {
                      if (isClicking.current && tool) {
                        handleHexData(coords, tool);
                      }
                    }}
                  >
                    {
                      (() => {
                        const terrain = map.hexes[coords]?.terrain;
                        const feature = map.hexes[coords]?.feature;
                        if (!feature && terrain && terrain_icons[terrain]) {
                          return <image xlinkHref={terrain_icons[terrain]} x="-2" y="-2.5" width="4" height="4" />;
                        } else if (feature && feature_icons[feature]) {
                          return <image xlinkHref={feature_icons[feature]} x="-2" y="-2.5" width="4" height="4" />;
                        }
                      })()
                    }
                    <text text-anchor="middle" y="2.7">{`${hex.q}/${hex.r}/${hex.s}`}</text>
                  </Hexagon>
                );
              })}
            </Layout>
          </HexGrid>
        </div>
      </div>
      <div className="hex-tools">
        <div className="label">- TERRAIN -</div>
        <div className="section">
          <HexMapTool id={''} type="terrain" icon={null} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="water" type="terrain" icon={terrain_icons['water']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="deepwater" type="terrain" icon={terrain_icons['deepwater']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="peak" type="terrain" icon={terrain_icons['peak']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="mountains" type="terrain" icon={terrain_icons['mountains']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="hills" type="terrain" icon={terrain_icons['hills']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="plains" type="terrain" icon={terrain_icons['plains']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="grassyhills" type="terrain" icon={terrain_icons['grassyhills']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="forest" type="terrain" icon={terrain_icons['forest']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="lightforest" type="terrain" icon={terrain_icons['lightforest']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="forestedhills" type="terrain" icon={terrain_icons['forestedhills']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="forestedmountains" type="terrain" icon={terrain_icons['forestedmountains']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="forestedpeak" type="terrain" icon={terrain_icons['forestedpeak']} tool={tool?.id} setTool={setTool} />
        </div>
        <div className="label">- FEATURES -</div>
        <div className="section">
          <HexMapTool id="city" type="feature" icon={feature_icons['city']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="tower" type="feature" icon={feature_icons['tower']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="village" type="feature" icon={feature_icons['village']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="temple" type="feature" icon={feature_icons['temple']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="ruins" type="feature" icon={feature_icons['ruins']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="tribe" type="feature" icon={feature_icons['tribe']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="cave" type="feature" icon={feature_icons['cave']} tool={tool?.id} setTool={setTool} />
          <HexMapTool id="dungeon" type="feature" icon={feature_icons['dungeon']} tool={tool?.id} setTool={setTool} />

          <button className={'zoom'} onClick={() => setZoom(!zoom)}>{
            zoom ? <ImZoomOut /> : <ImZoomIn />
          }</button>
        </div>
      </div>
    </div>
  );
};

export default HexMap;
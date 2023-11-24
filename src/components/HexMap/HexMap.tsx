import { useState, useRef, useEffect } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import './HexMap.css';

import useMapStore from '../../store/useMapStore';
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";

interface IHex { terrain?: string, feature?: string; };
interface IHexData { [key: string]: any; };


import { GiWhiteTower, GiMedievalGate, GiLockedChest, GiKnightBanner, GiHouse, GiGoldMine, GiDoorway, GiCastle, GiCastleRuins, GiChessRook, GiChurch, GiColiseum, GiCrossMark } from "react-icons/gi";


const HexMap = () => {
  const [maps, activeMap, updateMapHexes, updateMapSize] = useMapStore((state) => [state.maps, state.active_map, state.updateMapHexes, state.updateMapSize]);
  const map = maps.find((m) => m.id === activeMap);
  const [tool, setTool] = useState<{ id: string, type: string; } | null>(null);
  const [zoom, setZoom] = useState(true);
  const isClicking = useRef(false);

  if (!map) return <h1>no map</h1>;

  const hexes = GridGenerator.orientedRectangle(map.width, map.height);

  // const feature_icons: { [key: string]: any; } = {
  //   'city': <GiMedievalGate className="feature" />,
  //   'tower': <GiWhiteTower />,
  //   'town': <GiHouse />,
  //   'mine': <GiGoldMine />,
  //   'poi': <GiCrossMark />,
  //   'dungeon': <GiDoorway />,
  // };

  const feature_icons: { [key: string]: any; } = {
    'city': 'c',
    'town': 't',
    'poi': 'x',
    'dungeon': 'd',
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
                    {map.hexes[coords]?.feature &&
                      <text className="marker" text-anchor="middle" y="0">
                        {feature_icons[map.hexes[coords].feature]}
                      </text>
                    }
                    <text text-anchor="middle" y="2.7">{`${hex.q} ${hex.r} ${hex.s}`}</text>
                  </Hexagon>
                );
              })}
            </Layout>
          </HexGrid>
        </div>
      </div>
      <div className="hex-tools">
        <button className={`tool-water ${tool?.id === 'water' ? 'active' : ''}`} onClick={() => setTool({ id: 'water', type: 'terrain' })}>WATER</button>
        <button className={`tool-deepwater ${tool?.id === 'deepwater' ? 'active' : ''}`} onClick={() => setTool({ id: 'deepwater', type: 'terrain' })}>DEEP WATER</button>
        <button className={`tool-mountains ${tool?.id === 'mountains' ? 'active' : ''}`} onClick={() => setTool({ id: 'mountains', type: 'terrain' })}>MOUNTAINS</button>
        <button className={`tool-hills ${tool?.id === 'hills' ? 'active' : ''}`} onClick={() => setTool({ id: 'hills', type: 'terrain' })}>HILLS</button>
        <button className={`tool-plains ${tool?.id === 'plains' ? 'active' : ''}`} onClick={() => setTool({ id: 'plains', type: 'terrain' })}>PLAINS</button>
        <button className={`tool-forest ${tool?.id === 'forest' ? 'active' : ''}`} onClick={() => setTool({ id: 'forest', type: 'terrain' })}>FOREST</button>
        <button className={`tool-city ${tool?.id === 'city' ? 'active' : ''}`} onClick={() => setTool({ id: 'city', type: 'feature' })}>CITY</button>
        <button className={`tool-town ${tool?.id === 'town' ? 'active' : ''}`} onClick={() => setTool({ id: 'town', type: 'feature' })}>TOWN</button>
        <button className={`tool-dungeon ${tool?.id === 'dungeon' ? 'active' : ''}`} onClick={() => setTool({ id: 'dungeon', type: 'feature' })}>DUNGEON</button>
        <button className={`tool-poi ${tool?.id === 'poi' ? 'active' : ''}`} onClick={() => setTool({ id: 'poi', type: 'feature' })}>POINT OF INTEREST</button>
        <button onClick={() => setZoom(!zoom)}>ZOOM</button>
      </div>
    </div>
  );
};

export default HexMap;
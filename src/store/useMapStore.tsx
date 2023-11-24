import { create } from 'zustand';


interface IMap {
  id: number,
  label: string,
  background: string,
  hexes?: any;
  width: number,
  height: number,
}

interface IMapStore {
  maps: IMap[],
  active_map: number | null,
  addMap: (map: IMap) => void,
  deleteMap: (id: number) => void,
  deleteAllMaps: () => void,
  setActiveMap: (id: number | null) => void,
  updateMapHexes: (id: number, hexes: any) => void,
  updateMapSize: (id: number, height: number, width: number) => void,
  updateMap: (id: number, label: string, description: string, background: string) => void,
  updateMaps: (maps: IMap[]) => void,
}

const useMapStore = create<IMapStore>((set) => ({
  maps: JSON.parse(localStorage.getItem('deckbook-maps') || '[]'),
  active_map: null,
  addMap: (map) => set((state) => {
    localStorage.setItem('deckbook-maps', JSON.stringify([...state.maps, map]));
    return { maps: [...state.maps, map] };
  }),
  deleteMap: (id) => set((state) => {
    let maps_ = [...(state.maps.filter((m) => m.id !== id))];
    localStorage.setItem('deckbook-maps', JSON.stringify(maps_));
    return { maps: maps_, active_map: null };
  }),
  deleteAllMaps: () => set(() => {
    localStorage.setItem('deckbook-maps', JSON.stringify([]));
    return { maps: [] };
  }),
  setActiveMap: (id) => set(() => {
    return { active_map: id };
  }),
  updateMapHexes: (id, hexes) => set((state) => {
    let maps_ = [...state.maps];
    const map_index = maps_.findIndex((d) => d.id === id);
    if (map_index !== -1) {
      maps_[map_index].hexes = hexes;
    }
    localStorage.setItem('deckbook-maps', JSON.stringify([...maps_]));
    return { maps: [...maps_] };
  }),
  updateMapSize: (id, height, width) => set((state) => {
    let maps_ = [...state.maps];
    const map_index = maps_.findIndex((d) => d.id === id);
    if (map_index !== -1) {
      maps_[map_index].height = height;
      maps_[map_index].width = width;
    }
    localStorage.setItem('deckbook-maps', JSON.stringify([...maps_]));
    return { maps: [...maps_] };
  }),
  updateMap: (id, label, description, background) => set((state) => {
    let maps_ = [...state.maps];
    let map_index = maps_.findIndex((c) => c.id === id);
    if (map_index !== -1) {
      maps_[map_index].label = label;
      maps_[map_index].background = background;
    }
    localStorage.setItem('deckbook-maps', JSON.stringify([...maps_]));
    return { maps: [...maps_] };
  }),
  updateMaps: (maps) => set((state) => {
    let stored_maps = [...state.maps];
    maps.forEach((map) => {
      const index = stored_maps.findIndex((c) => c.id === map.id);
      if (index === -1) {
        stored_maps.push(map);
      } else {
        stored_maps[index] = map;
      }
    });
    localStorage.setItem('deckbook-maps', JSON.stringify([...stored_maps]));
    return { maps: [...stored_maps] };
  }),
}));

export default useMapStore;
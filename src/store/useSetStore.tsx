import { create } from 'zustand';
import useCardStore from './useCardStore';


interface ISet {
  id: number,
  label: string,
  background: string,
  cards: number[],
}

interface ISetStore {
  sets: ISet[],
  active_set: number | null,
  export_queue: number[],
  createSet: (set: ISet) => void,
  deleteSet: (id: number) => void,
  setActiveSet: (id: number) => void,
  addCardToSet: (set_id: number, card_id: number) => void,
  addToExportQueue: (set_id: number) => void,
  removeFromExportQueue: (set_id: number) => void,
  emptyExportQueue: () => void,
  updateSet: (id: number, label: string, background: string) => void,
  updateSets: (sets: ISet[]) => void,
}


const useSetStore = create<ISetStore>((set) => ({
  sets: JSON.parse(localStorage.getItem('deckbook-sets') || '[]'),
  active_set: (() => {
    const stored_value = localStorage.getItem('deckbook-sets-active');
    if (stored_value) return +stored_value * 1;
    else return null;
  })(),
  export_queue: [],
  createSet: (item) => set((state) => {
    let sets = [...state.sets, item];
    localStorage.setItem('deckbook-sets', JSON.stringify(sets));
    return { sets: [...sets] };
  }),
  deleteSet: (id) => set((state) => {
    let sets = [...state.sets.filter((c) => c.id !== id)];
    let active_set = state.active_set === id ? null : state.active_set;
    localStorage.setItem('deckbook-sets', JSON.stringify(sets));
    localStorage.setItem('deckbook-sets-active', JSON.stringify(active_set));
    useCardStore.getState().deleteCardsInSet(id);
    return {
      sets: sets,
      active_set: active_set
    };
  }),
  setActiveSet: (id) => set(() => {
    localStorage.setItem('deckbook-sets-active', JSON.stringify(id));
    return { active_set: id };
  }),
  addCardToSet: (set_id, card_id) => set((state) => {
    let sets = [...state.sets];
    let set_index = sets.findIndex((c) => c.id === set_id);
    if (set_index !== -1) {
      sets[set_index].cards.push(card_id);
    }
    localStorage.setItem('deckbook-sets', JSON.stringify(sets));
    return { sets: sets };
  }),
  addToExportQueue: (set_id) => set((state) => {
    if (!state.export_queue.includes(set_id)) {
      return { export_queue: [...state.export_queue, set_id] };
    }
    return state;
  }),
  removeFromExportQueue: (set_id) => set((state) => {
    return { export_queue: [...state.export_queue.filter((c) => c != set_id)] };
  }),
  emptyExportQueue: () => set(() => {
    return { export_queue: [] };
  }),
  updateSet: (id, label, background) => set((state) => {
    let sets_ = [...state.sets];
    const set_index = sets_.findIndex((c) => c.id === id);
    if (set_index !== -1) {
      sets_[set_index].label = label;
      sets_[set_index].background = background;
    }
    localStorage.setItem('deckbook-sets', JSON.stringify([...sets_]));
    return { sets: [...sets_] };
  }),
  updateSets: (sets) => set((state) => {
    let stored_sets = [...state.sets];
    sets.forEach((set) => {
      const index = stored_sets.findIndex((c) => c.id === set.id);
      if (index === -1) {
        stored_sets.push(set);
      } else {
        stored_sets[index] = set;
      }
    });
    localStorage.setItem('deckbook-sets', JSON.stringify(stored_sets));
    return { sets: stored_sets };
  })
}));


export default useSetStore;
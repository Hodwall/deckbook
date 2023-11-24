import { create } from 'zustand';
import useDeckStore from './useDeckStore';


interface ILibrary {
  id: number,
  type: string | null,
  label: string,
  background: string,
  decks: number[],
}

interface ILibraryStore {
  libraries: ILibrary[],
  active_library: number | null,
  export_queue: number[],
  addLibrary: (library: ILibrary) => void,
  deleteLibrary: (id: number) => void,
  setActiveLibrary: (id: number) => void,
  addDeckToLibrary: (library_id: number, deck_id: number) => void,
  addToExportQueue: (library_id: number) => void,
  removeFromExportQueue: (library_id: number) => void,
  emptyExportQueue: () => void,
  updateLibraries: (libraries: ILibrary[]) => void,
}

const useLibraryStore = create<ILibraryStore>((set) => ({
  libraries: JSON.parse(localStorage.getItem('deckbook-libraries') || '[]'),
  active_library: (() => {
    const stored_value = localStorage.getItem('deckbook-libraries-active');
    if (stored_value) return +stored_value * 1;
    else return null;
  })(),
  export_queue: [],
  addLibrary: (library) => set((state) => {
    let libraries = [...state.libraries, library];
    localStorage.setItem('deckbook-libraries', JSON.stringify(libraries));
    return { libraries: libraries };
  }),
  deleteLibrary: (id) => set((state) => {
    const deleteDeckList = useDeckStore.getState().deleteDeckList;
    let library = state.libraries.find((c) => c.id === id);
    if (library) deleteDeckList(library.decks);
    let libraries = [...state.libraries.filter((c) => c.id !== id)];
    let active_library = state.active_library === id ? null : state.active_library;
    localStorage.setItem('deckbook-libraries', JSON.stringify(libraries));
    localStorage.setItem('deckbook-libraries-active', JSON.stringify(active_library));
    return {
      libraries: libraries,
      active_library: active_library
    };
  }),
  setActiveLibrary: (id) => set(() => {
    localStorage.setItem('deckbook-libraries-active', JSON.stringify(id));
    return { active_library: id };
  }),
  addDeckToLibrary: (library_id, deck_id) => set((state) => {
    let libraries = [...state.libraries];
    let library_index = libraries.findIndex((c) => c.id === library_id);
    if (library_index !== -1) {
      libraries[library_index].decks.push(deck_id);
    }
    localStorage.setItem('deckbook-libraries', JSON.stringify(libraries));
    return { libraries: libraries };
  }),
  addToExportQueue: (library_id) => set((state) => {
    if (!state.export_queue.includes(library_id)) {
      return { export_queue: [...state.export_queue, library_id] };
    }
    return state;
  }),
  removeFromExportQueue: (library_id) => set((state) => {
    return { export_queue: [...state.export_queue.filter((c) => c != library_id)] };
  }),
  emptyExportQueue: () => set(() => {
    return { export_queue: [] };
  }),
  updateLibraries: (libraries) => set((state) => {
    let stored_librarys = [...state.libraries];
    libraries.forEach((library) => {
      const index = stored_librarys.findIndex((c) => c.id === library.id);
      if (index === -1) {
        stored_librarys.push(library);
      } else {
        stored_librarys[index] = library;
      }
    });
    localStorage.setItem('deckbook-libraries', JSON.stringify(stored_librarys));
    return { libraries: stored_librarys };
  })
}));

export default useLibraryStore;
import { create } from 'zustand';
import useDeckStore from './useDeckStore';


interface ICollection {
  id: number,
  label: string,
  background: string,
  decks: number[],
  cards: number[],
}

interface ICollectionStore {
  collections: ICollection[],
  active_collection: number | null,
  export_queue: number[],
  addCollection: (collection: ICollection) => void,
  deleteCollection: (id: number) => void,
  setActiveCollection: (id: number) => void,
  addDeckToCollection: (collection_id: number, deck_id: number) => void,
  addCardToCollection: (collection_id: number, card_id: number) => void,
  addToExportQueue: (collection_id: number) => void,
  removeFromExportQueue: (collection_id: number) => void,
  emptyExportQueue: () => void,
  updateCollections: (collections: ICollection[]) => void,
}

const useCollectionStore = create<ICollectionStore>((set) => ({
  collections: JSON.parse(localStorage.getItem('deckbook-collections') || '[]'),
  active_collection: (() => {
    const stored_value = localStorage.getItem('deckbook-collections-active');
    if (stored_value) return +stored_value * 1;
    else return null;
  })(),
  export_queue: [],
  addCollection: (collection) => set((state) => {
    let collections = [...state.collections, collection];
    localStorage.setItem('deckbook-collections', JSON.stringify(collections));
    return { collections: collections };
  }),
  deleteCollection: (id) => set((state) => {
    const deleteDeckList = useDeckStore.getState().deleteDeckList;
    let collection = state.collections.find((c) => c.id === id);
    if (collection) deleteDeckList(collection.decks);
    let collections = [...state.collections.filter((c) => c.id !== id)];
    let active_collection = state.active_collection === id ? null : state.active_collection;
    localStorage.setItem('deckbook-collections', JSON.stringify(collections));
    localStorage.setItem('deckbook-collections-active', JSON.stringify(active_collection));
    return {
      collections: collections,
      active_collection: active_collection
    };
  }),
  setActiveCollection: (id) => set(() => {
    localStorage.setItem('deckbook-collections-active', JSON.stringify(id));
    return { active_collection: id };
  }),
  addDeckToCollection: (collection_id, deck_id) => set((state) => {
    let collections = [...state.collections];
    let collection_index = collections.findIndex((c) => c.id === collection_id);
    if (collection_index !== -1) {
      collections[collection_index].decks.push(deck_id);
    }
    localStorage.setItem('deckbook-collections', JSON.stringify(collections));
    return { collections: collections };
  }),
  addCardToCollection: (collection_id, card_id) => set((state) => {
    let collections = [...state.collections];
    let collection_index = collections.findIndex((c) => c.id === collection_id);
    if (collection_index !== -1) {
      collections[collection_index].cards.push(card_id);
    }
    localStorage.setItem('deckbook-collections', JSON.stringify(collections));
    return { collections: collections };
  }),
  addToExportQueue: (collection_id) => set((state) => {
    if (!state.export_queue.includes(collection_id)) {
      return { export_queue: [...state.export_queue, collection_id] };
    }
    return state;
  }),
  removeFromExportQueue: (collection_id) => set((state) => {
    return { export_queue: [...state.export_queue.filter((c) => c != collection_id)] };
  }),
  emptyExportQueue: () => set(() => {
    return { export_queue: [] };
  }),
  updateCollections: (collections) => set((state) => {
    let stored_collections = [...state.collections];
    collections.forEach((collection) => {
      const index = stored_collections.findIndex((c) => c.id === collection.id);
      if (index === -1) {
        stored_collections.push(collection);
      } else {
        stored_collections[index] = collection;
      }
    });
    localStorage.setItem('deckbook-collections', JSON.stringify(stored_collections));
    return { collections: stored_collections };
  })
}));

export default useCollectionStore;
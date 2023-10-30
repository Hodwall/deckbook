import { create } from 'zustand';
import useDeckStore from './useDeckStore';


interface ICollection {
  id: number,
  label: string,
  background: string,
  decks: number[],
  cards: number[],
  // tags: string[],
}

interface ICollectionStore {
  collections: ICollection[],
  active_collection: number | null,
  addCollection: (collection: ICollection) => void,
  deleteCollection: (id: number) => void,
  setActiveCollection: (id: number) => void,
  addDeckToCollection: (collection_id: number, deck_id: number) => void,
  addCardToCollection: (collection_id: number, card_id: number) => void,
  // addTagToCollection: (tag: string) => void,
  // removeTagFromCollection: (tag: string) => void,
}

const useCollectionStore = create<ICollectionStore>((set) => ({
  collections: JSON.parse(localStorage.getItem('deckbook-collections') || '[]'),
  active_collection: (() => {
    const stored_value = localStorage.getItem('deckbook-collections-active');
    if (stored_value) return +stored_value * 1;
    else return null;
  })(),
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
  /**/
  // addTagToCollection: (tag) => set((state) => {
  //   let collections_ = [...state.collections];
  //   if (state.active_collection) {
  //     const collection_index = collections_.findIndex((c) => c.id === state.active_collection);
  //     if (collection_index !== -1) {
  //       if (collections_[collection_index].tags.findIndex((t) => t === tag) === -1) {
  //         collections_[collection_index].tags.push(tag);
  //       }
  //     }
  //   }
  //   localStorage.setItem('deckbook-collections', JSON.stringify(collections_));
  //   return { collections: collections_ };
  // }),
  // removeTagFromCollection: (tag) => set((state) => {
  //   let collections_ = [...state.collections];
  //   if (state.active_collection) {
  //     const collection_index = collections_.findIndex((c) => c.id === state.active_collection);
  //     if (collection_index !== -1) {
  //       collections_[collection_index].tags = collections_[collection_index].tags.filter((t) => t !== tag);
  //     }
  //   }
  //   localStorage.setItem('deckbook-collections', JSON.stringify(collections_));
  //   return { collections: collections_ };
  // }),
}));

export default useCollectionStore;
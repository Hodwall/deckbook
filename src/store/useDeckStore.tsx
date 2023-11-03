import { create } from 'zustand';
import useCollectionStore from './useCollectionStore';


interface IDeckTag {
  id: number,
  label: string,
}

interface IDeck {
  id: number,
  collection_id: number,
  label: string,
  background: string,
  tags: IDeckTag[],
  isPinned?: boolean,
}

interface IDeckStore {
  decks: IDeck[],
  active_deck: number | null,
  addDeck: (deck: IDeck) => void,
  deleteDeck: (id: number) => void,
  deleteDeckList: (list: number[]) => void,
  deleteAllDecks: () => void,
  setActiveDeck: (id: number | null) => void,
  addTagToDeck: (id: number, tag: IDeckTag) => void,
  removeTagFromDeck: (id: number, tag: number) => void,
  removeTagFromAllDecks: (tag: number) => void,
  updateDecks: (decks: IDeck[]) => void,
  togglePinDeck: (id: number) => void,
}

const useDeckStore = create<IDeckStore>((set) => ({
  decks: JSON.parse(localStorage.getItem('deckbook-decks') || '[]'),
  active_deck: (() => {
    const stored_value = localStorage.getItem('deckbook-decks-active');
    if (stored_value) return +stored_value * 1;
    else return null;
  })(),
  addDeck: (deck) => set((state) => {
    const addDeckToCollection = useCollectionStore.getState().addDeckToCollection;
    addDeckToCollection(deck.collection_id, deck.id);
    localStorage.setItem('deckbook-decks', JSON.stringify([...state.decks, deck]));
    return { decks: [...state.decks, deck] };
  }),
  deleteDeck: (id) => set((state) => {
    let decks_ = [...(state.decks.filter((d) => d.id !== id))];
    localStorage.setItem('deckbook-decks', JSON.stringify(decks_));
    return { decks: decks_ };
  }),
  deleteDeckList: (list: number[]) => set((state) => {
    let decks_ = [...state.decks.filter((d) => !list.includes(d.id))];
    localStorage.setItem('deckbook-decks', JSON.stringify(decks_));
    return { decks: decks_ };
  }),
  deleteAllDecks: () => set(() => {
    localStorage.setItem('deckbook-decks', JSON.stringify([]));
    return { decks: [] };
  }),
  setActiveDeck: (id) => set(() => {
    localStorage.setItem('deckbook-decks-active', JSON.stringify(id));
    return { active_deck: id };
  }),

  addTagToDeck: (id, tag) => set((state) => {
    let decks_ = [...state.decks];
    const deck_index = decks_.findIndex((d) => d.id === id);
    if (deck_index !== -1 && decks_[deck_index].tags.findIndex((t) => t.id === tag.id) === -1) {
      decks_[deck_index].tags.push(tag);
    }
    localStorage.setItem('deckbook-decks', JSON.stringify([...decks_]));
    return { decks: [...decks_] };
  }),
  removeTagFromDeck: (id, tag) => set((state) => {
    let decks_ = [...state.decks];
    const deck_index = decks_.findIndex((d) => d.id === id);
    if (deck_index !== -1) {
      decks_[deck_index].tags = [...decks_[deck_index].tags.filter((t) => t.id !== tag)];
    }
    localStorage.setItem('deckbook-decks', JSON.stringify([...decks_]));
    return { decks: [...decks_] };
  }),
  removeTagFromAllDecks: (tag) => set((state) => {
    let decks_ = [...state.decks];
    decks_.forEach((deck) => deck.tags = deck.tags.filter((t) => t.id !== tag));
    localStorage.setItem('deckbook-decks', JSON.stringify([...decks_]));
    return { decks: [...decks_] };
  }),
  updateDecks: (decks) => set((state) => {
    let stored_decks = [...state.decks];
    decks.forEach((deck) => {
      const index = stored_decks.findIndex((c) => c.id === deck.id);
      if (index === -1) {
        stored_decks.push(deck);
      } else {
        stored_decks[index] = deck;
      }
    });
    localStorage.setItem('deckbook-decks', JSON.stringify([...stored_decks]));
    return { decks: [...stored_decks] };
  }),
  togglePinDeck: (id) => set((state) => {
    let stored_decks = [...state.decks];
    const index = stored_decks.findIndex((d) => d.id === id);
    if (index !== -1) {
      stored_decks[index].isPinned = !stored_decks[index].isPinned;
    }
    localStorage.setItem('deckbook-decks', JSON.stringify([...stored_decks]));
    return { decks: [...stored_decks] };
  })
}));

export default useDeckStore;
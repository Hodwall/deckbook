import { create } from 'zustand';
import useCollectionStore from './useCollectionStore';


interface ICardTag {
  id: number,
  label: string,
}

interface ICard {
  id: number,
  collection_id: number,
  label: string,
  description: string,
  background: string,
  decks: number[],
  tags: ICardTag[],
  type?: number,
  type_data?: { [key: string]: number; } | null,
  content?: any;
}

interface ICardStore {
  cards: ICard[],
  active_card: number | null,
  addCard: (card: ICard) => void,
  deleteCard: (id: number) => void,
  deleteCardList: (list: number[]) => void,
  deleteAllCards: () => void,
  setActiveCard: (id: number | null) => void,
  addTagToCard: (id: number, tag: ICardTag) => void,
  removeTagFromCard: (id: number, tag: number) => void,
  removeTagFromAllCards: (tag: number) => void,
  addContentToCard: (id: number, content: any) => void,
  updateCard: (id: number, label: string, description: string, background: string) => void,
  updateCards: (cards: ICard[]) => void,
  setCardType: (card_id: number, type: number) => void,
  setCardTypeData: (card_id: number, data: { [key: string]: number; } | null) => void,
}

const useCardStore = create<ICardStore>((set) => ({
  cards: JSON.parse(localStorage.getItem('deckbook-cards') || '[]'),
  active_card: null,
  addCard: (card) => set((state) => {
    const addCardToCollection = useCollectionStore.getState().addCardToCollection;
    addCardToCollection(card.collection_id, card.id);
    localStorage.setItem('deckbook-cards', JSON.stringify([...state.cards, card]));
    return { cards: [...state.cards, card] };
  }),
  deleteCard: (id) => set((state) => {
    let cards_ = [...(state.cards.filter((c) => c.id !== id))];
    localStorage.setItem('deckbook-cards', JSON.stringify(cards_));
    return { cards: cards_, active_card: null };
  }),
  deleteCardList: (list: number[]) => set((state) => {
    let cards_ = [...state.cards.filter((c) => !list.includes(c.id))];
    localStorage.setItem('deckbook-cards', JSON.stringify(cards_));
    return { cards: cards_ };
  }),
  deleteAllCards: () => set(() => {
    localStorage.setItem('deckbook-cards', JSON.stringify([]));
    return { cards: [] };
  }),
  setActiveCard: (id) => set(() => {
    return { active_card: id };
  }),

  addTagToCard: (id, tag) => set((state) => {
    let cards_ = [...state.cards];
    const card_index = cards_.findIndex((d) => d.id === id);
    if (card_index !== -1 && cards_[card_index].tags.findIndex((t) => t.id === tag.id) === -1) {
      cards_[card_index].tags.push(tag);
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  removeTagFromCard: (id, tag) => set((state) => {
    let cards_ = [...state.cards];
    const card_index = cards_.findIndex((d) => d.id === id);
    if (card_index !== -1) {
      cards_[card_index].tags = [...cards_[card_index].tags.filter((t) => t.id !== tag)];
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  removeTagFromAllCards: (tag) => set((state) => {
    let cards_ = [...state.cards];
    cards_.forEach((card) => card.tags = card.tags.filter((t) => t.id !== tag));
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  addContentToCard: (id, content) => set((state) => {
    let cards_ = [...state.cards];
    const card_index = cards_.findIndex((d) => d.id === id);
    if (card_index !== -1) {
      cards_[card_index].content = content;
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  updateCard: (id, label, description, background) => set((state) => {
    let cards_ = [...state.cards];
    let card_index = cards_.findIndex((c) => c.id === id);
    if (card_index !== -1) {
      cards_[card_index].label = label;
      cards_[card_index].description = description;
      cards_[card_index].background = background;
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  updateCards: (cards) => set((state) => {
    let stored_cards = [...state.cards];
    cards.forEach((card) => {
      const index = stored_cards.findIndex((c) => c.id === card.id);
      if (index === -1) {
        stored_cards.push(card);
      } else {
        stored_cards[index] = card;
      }
    });
    localStorage.setItem('deckbook-cards', JSON.stringify([...stored_cards]));
    return { cards: [...stored_cards] };
  }),
  setCardType: (card_id, type) => set((state) => {
    let cards_ = [...state.cards];
    let card_index = cards_.findIndex((c) => c.id === card_id);
    if (card_index !== -1) {
      cards_[card_index].type = type;
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  setCardTypeData: (card_id, type_data) => set((state) => {
    let cards_ = [...state.cards];
    let card_index = cards_.findIndex((c) => c.id === card_id);
    if (card_index !== -1) {
      if (type_data) {
        cards_[card_index].type_data = { ...type_data };
      } else {
        cards_[card_index].type_data = null;
      }
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  })
}));

export default useCardStore;
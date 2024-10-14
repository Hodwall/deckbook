import { create } from 'zustand';
import useSetStore from './useSetStore';
import useDeckStore from './useDeckStore';
import Cards from '../pages/Cards/Cards';


export interface ICard {
  id: number,
  set_id?: number,
  label: string,
  description: string,
  background: string,
  background_alt?: string,
  tags: string[],
  type?: string,
  type_data?: { [key: string]: number; } | null,
  content?: any;
  isPinned?: boolean,
  linked_cards?: number[];
  isWide?: boolean,
}

interface ICardStore {
  cards: ICard[],
  active_cards: number[],
  active_wide_card: number | null,
  hand_cards: number[],
  addCard: (card: ICard) => void,
  deleteCard: (id: number) => void,
  deleteCardList: (list: number[]) => void,
  deleteCardsInSet: (set_id: number) => void,
  deleteAllCards: () => void,
  setActiveCard: (id: number) => void,
  removeActiveCard: (id: number) => void,
  setActiveWideCard: (id: number | null) => void,
  addTagToCard: (id: number, tag: string) => void,
  removeTagFromCard: (id: number, tag: string) => void,
  removeTagFromAllCards: (tag: string) => void,
  addContentToCard: (id: number, content: any) => void,
  updateCard: (id: number, label: string, description: string, background: string, background_alt?: string, set?: number) => void,
  updateCards: (cards: ICard[]) => void,
  setCardType: (card_id: number, type: string) => void,
  setCardTypeData: (card_id: number, data: { [key: string]: number; } | null) => void,
  togglePinCard: (id: number) => void,
  addLinkedCard: (id: number, link_id: number) => void,
  removeLinkedCard: (id: number, link_id: number) => void,
  toggleWideCard: (id: number) => void,
  resetActiveCards: () => void;
  addCardToHand: (id: number) => void,
  addAllCardsToHand: () => void,
  drawCardFromHand: (id: number) => void,
  drawAllCardsFromHand: () => void,
  emptyHand: () => void,
}

const useCardStore = create<ICardStore>((set) => ({
  cards: (() => {
    // TEMPORARY FIX UNTIL TESTERS UPDATE THEIR CARDS
    let cards_ = JSON.parse(localStorage.getItem('deckbook-cards') || '[]');
    cards_.forEach((card: any) => {
      card.tags = card.tags.reduce((results: any[], tag: any) => {
        if (tag) {
          if (typeof tag !== 'string') {
            if (!tag.isArray) results.push(tag.label);
          } else {
            results.push(tag);
          }
        }
        return results;
      }, []);
      if (isNaN(card.type)) card.type = null;
      if (!card.linked_cards) card.linked_cards = [];
    });
    return cards_;
  })(),
  active_cards: [],
  hand_cards: [],
  active_wide_card: null,
  addCard: (card) => set((state) => {
    const addCardToSet = useSetStore.getState().addCardToSet;
    if (card.set_id) addCardToSet(card.set_id, card.id);
    localStorage.setItem('deckbook-cards', JSON.stringify([...state.cards, card]));
    return { cards: [...state.cards, card] };
  }),
  deleteCard: (id) => set((state) => {
    let cards_ = [...(state.cards.filter((c) => c.id !== id))];
    let active_cards_ = [...(state.active_cards.filter((c) => c !== id))];
    let active_wide_card_ = state.active_wide_card === id ? null : state.active_wide_card;
    localStorage.setItem('deckbook-cards', JSON.stringify(cards_));
    return { cards: cards_, active_cards: active_cards_, active_wide_card: active_wide_card_ };
  }),
  deleteCardList: (list: number[]) => set((state) => {
    let cards_ = [...state.cards.filter((c) => !list.includes(c.id))];
    localStorage.setItem('deckbook-cards', JSON.stringify(cards_));
    return { cards: cards_ };
  }),
  deleteCardsInSet: (set_id: number) => set((state) => {
    let cards_ = [...state.cards.filter((c) => c.set_id !== set_id)];
    localStorage.setItem('deckbook-cards', JSON.stringify(cards_));
    return { cards: cards_ };
  }),
  deleteAllCards: () => set(() => {
    localStorage.setItem('deckbook-cards', JSON.stringify([]));
    return { cards: [] };
  }),
  setActiveCard: (id) => set((state) => {
    if (!state.active_cards.includes(id)) {
      let hand_cards_ = [...state.hand_cards.filter((c) => c !== id)];
      return { active_cards: [...state.active_cards, id], hand_cards: hand_cards_ };
    } else {
      return state;
    }
  }),
  removeActiveCard: (id) => set((state) => {
    return { active_cards: state.active_cards.filter((card_id) => card_id !== id) };
  }),
  resetActiveCards: () => set((state) => {
    return { active_cards: [] };
  }),
  setActiveWideCard: (id) => set((state) => {
    return { active_wide_card: id, hand_cards: [...state.hand_cards.filter((c) => c !== id)] };
  }),
  addTagToCard: (id, tag) => set((state) => {
    let cards_ = [...state.cards];
    const card_index = cards_.findIndex((d) => d.id === id);
    if (card_index !== 1 && !cards_[card_index].tags.includes(tag)) {
      cards_[card_index].tags.push(tag);
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  removeTagFromCard: (id, tag) => set((state) => {
    let cards_ = [...state.cards];
    const card_index = cards_.findIndex((c) => c.id === id);
    if (card_index !== -1) {
      cards_[card_index].tags = [...cards_[card_index].tags.filter((t) => t !== tag)];
    }
    const tag_index = cards_.findIndex((c) => c.tags.includes(tag));
    if (tag_index !== -1) {
      useDeckStore.getState().removeTagFromAllDecks(tag);
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...cards_]));
    return { cards: [...cards_] };
  }),
  removeTagFromAllCards: (tag) => set((state) => {
    let cards_ = [...state.cards];
    cards_.forEach((card) => card.tags = card.tags.filter((t) => t !== tag));
    useDeckStore.getState().removeTagFromAllDecks(tag);
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
  updateCard: (id, label, description, background, background_alt, set_id) => set((state) => {
    let cards_ = [...state.cards];
    let card_index = cards_.findIndex((c) => c.id === id);
    if (card_index !== -1) {
      cards_[card_index].label = label;
      cards_[card_index].description = description;
      cards_[card_index].background = background;
      cards_[card_index].background_alt = background_alt;
      cards_[card_index].set_id = set_id;
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
  }),
  togglePinCard: (id) => set((state) => {
    let stored_cards = [...state.cards];
    const index = stored_cards.findIndex((c) => c.id === id);
    if (index !== -1) {
      stored_cards[index].isPinned = !stored_cards[index].isPinned;
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...stored_cards]));
    return { cards: [...stored_cards] };
  }),
  addLinkedCard: (id, link_id) => set((state) => {
    let stored_cards = [...state.cards];
    const index = stored_cards.findIndex((c) => c.id === id);
    if (index != -1) {
      stored_cards[index].linked_cards?.push(link_id);
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...stored_cards]));
    return { cards: [...stored_cards] };
  }),
  removeLinkedCard: (id, link_id) => set((state) => {
    let stored_cards = [...state.cards];
    const index = stored_cards.findIndex((c) => c.id === id);
    if (index != -1) {
      stored_cards[index].linked_cards = [...stored_cards[index].linked_cards?.filter((id) => id !== link_id) ?? []];
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...stored_cards]));
    return { cards: [...stored_cards] };
  }),
  toggleWideCard: (id) => set((state) => {
    let stored_cards = [...state.cards];
    let active_card_status = {};
    const index = stored_cards.findIndex((c) => c.id === id);
    if (index !== -1) {
      stored_cards[index].isWide = !stored_cards[index].isWide;
      if (stored_cards[index].isWide && state.active_cards.includes(id)) {
        active_card_status = {
          active_cards: state.active_cards.filter((card) => card !== id),
          active_wide_card: id
        };
      } else if (!stored_cards[index].isWide && state.active_wide_card === id) {
        active_card_status = {
          active_cards: [...state.active_cards, id],
          active_wide_card: null
        };
      }
    }
    localStorage.setItem('deckbook-cards', JSON.stringify([...stored_cards]));
    return {
      cards: [...stored_cards],
      ...active_card_status
    };
  }),
  addCardToHand: (id) => set((state) => {
    let hand_cards_ = [...state.hand_cards];
    let active_cards_ = [...state.active_cards];
    let active_wide_card_ = state.active_wide_card;
    let card = state.cards.find((card) => card.id === id);
    if (!hand_cards_.find((c) => c === id)) hand_cards_.push(id);
    if (card?.isWide) {
      active_wide_card_ = null;
    } else {
      active_cards_ = [...active_cards_.filter((c) => c !== id)];
    }
    return { hand_cards: [...hand_cards_], active_cards: [...active_cards_], active_wide_card: active_wide_card_ };
  }),
  addAllCardsToHand: () => set((state) => {
    let hand_cards_ = [...state.hand_cards];
    let active_cards_ = [...state.active_cards];
    active_cards_.forEach((card) => {
      if (!hand_cards_.find((c) => c === card)) hand_cards_.push(card);
    });
    state.active_wide_card && hand_cards_.push(state.active_wide_card);
    return { hand_cards: hand_cards_, active_cards: [], active_wide_card: null };
  }),
  drawCardFromHand: (id) => set((state) => {
    let hand_cards_ = [...state.hand_cards];
    let active_cards_ = [...state.active_cards];
    let active_wide_card_ = state.active_wide_card;
    let card = state.cards.find((card) => card.id === id);
    if (card?.isWide) {
      if (active_wide_card_) hand_cards_.push(active_wide_card_);
      active_wide_card_ = id;
    } else {
      if (!active_cards_.find((c) => c === id)) active_cards_.push(id);
    }
    hand_cards_ = [...hand_cards_.filter((c) => c !== id)];
    return { hand_cards: [...hand_cards_], active_cards: [...active_cards_], active_wide_card: active_wide_card_ };
  }),
  drawAllCardsFromHand: () => set((state) => {
    let hand_cards_ = [...state.hand_cards];
    let active_cards_ = [...state.active_cards];
    hand_cards_.forEach((card) => {
      if (state.cards.find((c) => c.id === card)?.isWide) return;
      if (!active_cards_.find((c) => c === card)) {
        active_cards_.push(card);
        hand_cards_ = [...hand_cards_.filter((c) => c !== card)];
      }
    });
    return { hand_cards: hand_cards_, active_cards: active_cards_ };
  }),
  emptyHand: () => set(() => {
    return { hand_cards: [] };
  })
}));

export default useCardStore;
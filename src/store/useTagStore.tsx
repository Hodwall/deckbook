import { create } from 'zustand';
import useSetStore from './useSetStore';
import useDeckStore from './useDeckStore';
import useCardStore from './useCardStore';


export interface ITag {
  id: number,
  set_id: number,
  label: string,
  decks: number[],
  cards: number[],
}

interface ITagStore {
  tags: ITag[],
  active_tags: string[],
  createTag: (tag: string, card_id?: number, deck_id?: number) => void,
  deleteTag: (id: number) => void,
  addCardToTag: (id: number, card_id: number) => void,
  removeCardFromTag: (id: number, card_id: number) => void,
  addDeckToTag: (id: number, deck_id: number) => void,
  removeDeckFromTag: (id: number, card_id: number) => void,
  updateTags: (tags: ITag[]) => void,
  setActiveTags: (tags: string[]) => void,
}


const useTagStore = create<ITagStore>((set) => ({
  tags: JSON.parse(localStorage.getItem('deckbook-tags') || '[]'),
  active_tags: [],
  createTag: (tag, card_id, deck_id) => set((state) => {
    let tags_ = state.tags;
    const active_set = useSetStore.getState().active_set;
    let set_tags = tags_.filter((t) => t.set_id === active_set);
    if (set_tags.findIndex((t) => t.label === tag) === -1) {
      const tag_: ITag = {
        id: Date.now(),
        set_id: active_set || -1,
        label: tag,
        decks: [],
        cards: [],
      };
      if (card_id) {
        tag_.cards.push(card_id);
        useCardStore.getState().addTagToCard(card_id, { id: tag_.id, label: tag_.label });
      }
      if (deck_id) {
        tag_.cards.push(deck_id);
        useDeckStore.getState().addTagToDeck(deck_id, { id: tag_.id, label: tag_.label });
      }
      tags_.push(tag_);
    }
    localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
    return { tags: tags_ };
  }),
  deleteTag: (id) => set((state) => {
    let tags_ = [...(state.tags.filter((t) => t.id !== id))];
    useDeckStore.getState().removeTagFromAllDecks(id);
    useCardStore.getState().removeTagFromAllCards(id);
    localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
    return { tags: tags_ };
  }),
  addCardToTag: (id, card_id) => set((state) => {
    let tags_ = state.tags;
    let tag_index = state.tags.findIndex((t) => t.id === id);
    if (tag_index !== -1) {
      tags_[tag_index].cards.push(card_id);
    }
    localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
    return { tags: tags_ };
  }),
  removeCardFromTag: (id, card_id) => set((state) => {
    let tags_ = state.tags;
    let tag_index = state.tags.findIndex((t) => t.id === id);
    if (tag_index !== -1) {
      tags_[tag_index].cards = tags_[tag_index].cards.filter((c) => c !== card_id);
      if (tags_[tag_index].cards.length <= 0 && tags_[tag_index].decks.length <= 0) {
        state.deleteTag(id);
        return {};
      } else {
        localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
        return { tags: tags_ };
      }
    }
    return { tags_ };
  }),
  addDeckToTag: (id, deck_id) => set((state) => {
    let tags_ = state.tags;
    let tag_index = state.tags.findIndex((t) => t.id === id);
    if (tag_index !== -1) {
      tags_[tag_index].decks.push(deck_id);
    }
    localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
    return { tags: tags_ };
  }),
  removeDeckFromTag: (id, deck_id) => set((state) => {
    let tags_ = state.tags;
    let tag_index = state.tags.findIndex((t) => t.id === id);
    if (tag_index !== -1) {
      tags_[tag_index].decks = tags_[tag_index].decks.filter((c) => c !== deck_id);
      if (tags_[tag_index].decks.length <= 0 && tags_[tag_index].cards.length <= 0) {
        state.deleteTag(id);
        return {};
      } else {
        localStorage.setItem('deckbook-tags', JSON.stringify(tags_));
        return { tags: tags_ };
      }
    }
    return { tags_ };
  }),
  updateTags: (tags) => set((state) => {
    let stored_tags = [...state.tags];
    tags.forEach((tag) => {
      const index = stored_tags.findIndex((c) => c.id === tag.id);
      if (index === -1) {
        stored_tags.push(tag);
      } else {
        stored_tags[index] = tag;
      }
    });
    localStorage.setItem('deckbook-tags', JSON.stringify(stored_tags));
    return { tags: stored_tags };
  }),
  setActiveTags: (tags) => set(() => ({ active_tags: tags }))
}));

export default useTagStore;
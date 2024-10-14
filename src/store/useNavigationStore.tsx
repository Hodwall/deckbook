import { create } from 'zustand';

interface Store {
  section: { name: string, item_id?: number | null, set?: number | null, deck?: number | null; },
  active_tags: string[],
  setActiveTags: (tags: string[]) => void,
  setSection: (section: string, set_id?: number | null, deck_id?: number | null) => void,
}

const useNavigationStore = create<Store>((set) => ({
  section: { name: 'sets' },
  active_tags: [],
  setSection: (section, set_id, deck_id) => set((state) => ({
    section: {
      name: section,
      ... { set: set_id, deck: deck_id },
    }
  })),
  setActiveTags: (tags) => set(() => ({ active_tags: tags }))
}));

export default useNavigationStore;
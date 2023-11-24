import { create } from 'zustand';

interface Store {
  section: { name: string, item_id?: number | null; },
  setSection: (section: string, id?: number) => void,
}

const useNavigationStore = create<Store>((set) => ({
  section: { name: 'collections' },
  setSection: (section, id) => set((state) => ({
    section: {
      name: section,
      ...id && { item_id: id },
    }
  }))
}));

export default useNavigationStore;
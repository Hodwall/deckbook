import { create } from 'zustand';

interface Store {
    section: string,
    setSection: (s: string) => void,
}

const useNavigationStore = create<Store>((set) => ({
    section: 'collections',
    setSection: (s) => set(() => ({ section: s }))
}));

export default useNavigationStore;
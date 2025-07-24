import { create } from 'zustand';

interface IEventProfileStore {
  isProfileComplete: boolean;
  setProfileComplete: (value: boolean) => void;
}

export const useEventProfileStore = create<IEventProfileStore>((set) => ({
  isProfileComplete: false,
  setProfileComplete: (value) => set({ isProfileComplete: value }),
}));

import { create } from 'zustand';

interface IEventProfileStore {
  isProfileComplete: boolean;
  myPinNumber: number | null;

  setProfileComplete: (value: boolean) => void;
  setMyPinNumber: (pin: number | null) => void;
}

export const useEventProfileStore = create<IEventProfileStore>((set) => ({
  isProfileComplete: false,
  myPinNumber: null,

  setProfileComplete: (value) => set({ isProfileComplete: value }),
  setMyPinNumber: (pin) => set({ myPinNumber: pin }),
}));

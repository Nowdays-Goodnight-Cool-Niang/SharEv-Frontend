import { create } from 'zustand';
import { IProfile } from '../types';

interface IProfileStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
}

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: null,
  setProfile: (profile: IProfile) => set({ profile }),
}));

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IProfile } from '../types';

interface IProfileStore {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
}

export const useProfileStore = create<IProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: IProfile) => set({ profile }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

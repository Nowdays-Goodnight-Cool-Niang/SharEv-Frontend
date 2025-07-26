import { create } from 'zustand';

interface ParticipationInfoState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useParticipationInfoStore = create<ParticipationInfoState>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

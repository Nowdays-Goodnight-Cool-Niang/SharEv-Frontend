import { create } from 'zustand';
import { EventTabType } from '../enums';

interface IEventTabsStore {
  selected: EventTabType;
  setSelected: (eventTabType: EventTabType) => void;
}

export const useEventTabsStore = create<IEventTabsStore>((set) => ({
  selected: EventTabType.profile,
  setSelected: (eventTabType: EventTabType) => set({ selected: eventTabType }),
}));

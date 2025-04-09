import { create } from 'zustand';
import { IShareCardDetailsByEvent } from '../types';

interface IShareCardDetailStore {
  editMode: boolean;
  shareCardDetail: IShareCardDetailsByEvent | null;
  isShareCardDetailBlank: () => boolean;
  setEditMode: (state: boolean) => void;
  setShareCardDetailByKey: (key: string, value: string) => void;
  setShareCardDetail: (shareCardDetail: IShareCardDetailsByEvent) => void;
}

export const useShareCardDetailStore = create<IShareCardDetailStore>((set, get) => ({
  editMode: false,
  shareCardDetail: {
    teamName: null,
    position: null,
    introductionText: null,
  },
  isShareCardDetailBlank: () => {
    const detail = get().shareCardDetail;
    return !detail || !detail.teamName || !detail.position || !detail.introductionText;
  },
  setEditMode: (editMode: boolean) => set({ editMode }),
  setShareCardDetailByKey: (key: string, value: string) =>
    set((state) => {
      if (!state.shareCardDetail) return {};
      return {
        shareCardDetail: {
          ...state.shareCardDetail,
          [key]: value,
        },
      };
    }),
  setShareCardDetail: (shareCardDetail: IShareCardDetailsByEvent) => set({ shareCardDetail }),
}));

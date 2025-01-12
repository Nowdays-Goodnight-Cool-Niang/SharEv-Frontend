import { create } from 'zustand';
import {IParticipantInfo} from "../types/index"

interface IParticipantProfileState {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    participantProfile?: IParticipantInfo;
  setParticipantProfile: (info: IParticipantInfo) => void;
  clear: () => void;
}
export const useParticipantProfileStore = create<IParticipantProfileState>((set) => ({
    isOpen: false, // 초기값: 모달 닫힘 상태
    setOpen: (open: boolean) => set({ isOpen: open }), // 모달 열기/닫기
  
    participantProfile: undefined, // 초기값: undefined
    setParticipantProfile: (info: IParticipantInfo) => set({ participantProfile: info }), // 프로필 설정
    clear: () =>
      set({
        isOpen: false,
        participantProfile: undefined, // 초기화
      }),
  }));
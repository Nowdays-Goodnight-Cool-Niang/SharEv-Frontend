import { IShareCard } from '.';

export interface ParticipantsResponse {
  registerCount: number;
  participants: IShareCard[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  isLast: boolean;
}

export interface KakaoLoginResponse {
  isAuthenticated: boolean;
}

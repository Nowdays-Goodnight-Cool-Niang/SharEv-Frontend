import { IProfile } from '.';

export interface ParticipantsResponse {
  accountInfoPage: {
    content: IProfile[];
  };
  totalSize: number;
}

export interface KakaoLoginResponse {
  isAuthenticated: boolean;
}

// export interface ParticipantsResponse {
//   registerCount: number;
//   participants: IShareCard[];
//   totalCount: number;
//   totalPages: number;
//   currentPage: number;
//   isLast: boolean;
// }

export interface KakaoLoginResponse {
  isAuthenticated: boolean;
}

export interface EventProfileDetailRequest {
  introduce: string;
  proudestExperience: string;
  toughExperience: string;
}

export interface EventProfileResponse {
  participantId: number;
  name: string;
  email: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
  introduce: {
    version: number;
  } & EventProfileDetailRequest;
  registerRequireFlag: boolean;
}

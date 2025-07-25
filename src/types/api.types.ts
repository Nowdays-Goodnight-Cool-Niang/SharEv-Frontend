export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface RelationProfiles {
  content: CustomEventProfile[];
  page: PageInfo;
}

export interface ParticipantsResponse {
  registerCount: number;
  relationProfiles: RelationProfiles;
}

export interface KakaoLoginResponse {
  isAuthenticated: boolean;
}

export interface EventProfileDetailRequest {
  introduce: string;
  proudestExperience: string;
  toughExperience: string;
}

export interface EventProfileResponse extends EventProfileDetailRequest {
  profileId: number;
  name: string;
  email: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
  registerRequireFlag: boolean;
  iconNumber: number;
  pinNumber: number;
}

export interface CustomEventProfile extends Partial<EventProfileDetailRequest> {
  profileId?: number;
  name: string;
  email?: string;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  instagramUrl?: string | null;
  relationFlag: boolean;
  iconNumber: number;
}

export interface ParticipationCheckResponse {
  isParticipant: boolean;
}

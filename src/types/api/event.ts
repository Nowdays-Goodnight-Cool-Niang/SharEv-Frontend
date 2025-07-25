import { PageInfo } from './common';

export interface ProfileContent {
  introduce: string | null;
  proudestExperience: string | null;
  toughExperience: string | null;
}

export interface FullProfileResponse extends Partial<ProfileContent> {
  type: 'full';
  profileId?: number;
  name: string;
  email: string;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  instagramUrl?: string | null;
  relationFlag: boolean;
  iconNumber: number;
}

export interface MinimalProfileResponse
  extends Omit<ProfileContent, 'introduce' | 'toughExperience'> {
  type: 'minimum';
  name: string;
  iconNumber: number;
  relationFlag: boolean;
}

export type PublicProfileResponse = FullProfileResponse | MinimalProfileResponse;

export interface PaginatedEventProfilesResponse {
  registerCount: number;
  relationProfiles: {
    content: PublicProfileResponse[];
    page: PageInfo;
  };
}

export interface MyEventProfileResponse extends ProfileContent {
  type: 'my';
  profileId: number;
  name: string;
  email: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
  iconNumber: number;
  pinNumber: number;
  registerRequireFlag: boolean;
}

export interface ParticipationCheckResponse {
  isParticipant: boolean;
}

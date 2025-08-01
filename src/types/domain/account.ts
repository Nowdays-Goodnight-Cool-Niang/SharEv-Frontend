export interface IAccountApiResponse {
  id?: string;
  name: string;
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

export type IAccountUpdateRequest = Omit<IAccountApiResponse, 'id'>;

export interface ISocialLinks {
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export interface IAccount {
  id?: string;
  name: string;
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

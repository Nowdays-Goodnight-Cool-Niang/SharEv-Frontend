export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

export interface IShareCardDetailsByEvent {
  teamName: string | null;
  position: string | null;
  introductionText: string | null;
}

export interface IShareCard extends IProfile, IShareCardDetailsByEvent {}

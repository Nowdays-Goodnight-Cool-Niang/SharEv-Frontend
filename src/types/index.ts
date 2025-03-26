export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

export interface IShareCardDetailsByEvent {
  teamName: string;
  position: string;
  introductionText: string;
}

export interface IShareCard extends IProfile, IShareCardDetailsByEvent {}

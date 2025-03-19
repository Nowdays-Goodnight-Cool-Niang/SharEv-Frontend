export interface IEvent {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  startedAt: string;
  endedAt: string;
}

export interface IEventDetail {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  startedAt: string;
  endedAt: string;
  organizer: string;
  place: string;
  eventUrl: string;
  registration: boolean;
  totalRegistrations: number;
}

export interface IEventParticipant {
  id: string;
  name: string;
  profileImageId: number;
  connection: boolean;
}

export interface IEventProfile {
  eventId: string;
  jobGroup: string;
  teamName: string;
  projectInfo: string;
}

export interface IAccount {
  id: number;
  name: string;
  phone?: string;
  profileImageId: number;
  github: string;
  instagram: string;
  facebook: string;
}

export interface IParticipantInfo {
  id: string;
  accountId: string;
  name: string;
  phone?: string;
  profileImageId: number;
  github?: string;
  instagram?: string;
  facebook?: string;
  jobGroup: string;
  teamName: string;
  projectInfo: string;
}

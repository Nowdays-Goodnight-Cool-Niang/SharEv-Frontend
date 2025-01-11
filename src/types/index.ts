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
  connection: boolean
}






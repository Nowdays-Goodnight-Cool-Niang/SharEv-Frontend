export interface IEvent {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  startedAt: Date;
  endedAt: Date;
}

export interface IEventDetail {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  startedAt: Date;
  endedAt: Date;
  organizer: string;
  place: string;
  eventUrl: string;
  registration: boolean;
  totalRegistrations: number;
}

import { PageInfo } from './common';

export interface CardUpdateRequest {
  version: number;
  introductionText: Record<string, string>;
}

export interface CardResponse {
  type: 'FULL' | 'MINIMUM';
  cardId: number;
  name: string;
  email: string;
  linkUrls: string[];
  lastIntroduceTemplateVersion: number;
  nowIntroduceTemplateVersion: number;
  introduceTemplateContentText: string;
  introductionText: Record<string, string>;
}

export type MyCardResponse = Omit<CardResponse, 'type'> & { type: 'FULL' };

export interface PaginatedCardsResponse {
  content: CardResponse[];
  page: PageInfo;
}

export interface ParticipationCheckResponse {
  isParticipant: boolean;
}

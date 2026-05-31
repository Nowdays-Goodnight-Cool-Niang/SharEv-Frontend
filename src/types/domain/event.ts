import { EventProfileState } from '@/constants/event';
import { IAccount } from './account';
import { PageInfo } from '../api/common';

export interface IBaseEventProfile extends IAccount {
  iconNumber: number;
}

export type TemplateBlock = { type: 'text'; value: string } | { type: 'input'; fieldKey: string };

export interface IInputField {
  value: string;
  placeholder: string;
}

export interface TemplateContent {
  blocks: TemplateBlock[];
  fields: Record<string, IInputField>;
}

interface WithTemplate {
  template: TemplateContent;
}

export interface IMyEventProfile extends IBaseEventProfile, WithTemplate {
  type: 'MY';
  cardId: number;
  lastIntroduceTemplateVersion: number;
  nowIntroduceTemplateVersion: number;
}

export interface IFullEventProfile extends IBaseEventProfile, WithTemplate {
  type: 'FULL';
}

export interface IMinimumEventProfile
  extends Omit<IBaseEventProfile, 'email' | 'linkUrls'>,
    WithTemplate {
  type: 'MINIMUM';
}

export type IPublicEventProfile = IFullEventProfile | IMinimumEventProfile;
export type IEventProfile = IMyEventProfile | IPublicEventProfile;

export type EventProfileType = 'MY' | 'FULL' | 'MINIMUM';
export type EventProfileStateType = (typeof EventProfileState)[keyof typeof EventProfileState];

export interface IPaginatedEventProfiles {
  page: PageInfo;
  profiles: IPublicEventProfile[];
}

/** BE: GatheringDetailResponse */
export interface IGathering {
  id: string;
  visible: 'PUBLIC' | 'PRIVATE';
  title: string;
  content: string;
  startAt: string;
  endAt: string;
  place: string;
  imageUrl?: string;
  gatheringUrl?: string;
  contact?: string;
  registerStartAt: string;
  registerEndAt: string;
}

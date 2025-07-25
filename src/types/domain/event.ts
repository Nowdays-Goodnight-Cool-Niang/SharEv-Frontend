import { EventProfileState } from '@/constants/event';
import { IAccount } from './account';

export interface IBaseEventProfile extends Omit<IAccount, 'email'> {
  email?: string;
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
  type: 'my';
  pinNumber: number;
  registerRequireFlag: boolean;
}

export interface IFullEventProfile extends IBaseEventProfile, WithTemplate {
  type: 'full';
  relationFlag: boolean;
}

export interface IMinimumEventProfile
  extends Omit<IBaseEventProfile, 'email' | 'socialLinks'>,
    WithTemplate {
  type: 'minimum';
  relationFlag: boolean;
}

export type IPublicEventProfile = IFullEventProfile | IMinimumEventProfile;
export type IEventProfile = IMyEventProfile | IPublicEventProfile;
export type EventProfileType = 'my' | 'shared' | 'unshared';

export type EventProfileStateType = (typeof EventProfileState)[keyof typeof EventProfileState];

export interface IEvent {
  id: number;
  eventName: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  organizer: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

export interface ISocialLinks {
  github?: string;
  linkedIn?: string;
  instagram?: string;
}

export interface IProfile {
  id?: string;
  name: string;
  email: string;
  socialLinks?: ISocialLinks;
}

type TextBlock = {
  type: 'text';
  value: string;
};

type InputBlock = {
  type: 'input';
  fieldKey: string;
};

export type TemplateBlock = TextBlock | InputBlock;

export interface IInputFieldConfig {
  value: string;
  placeholder: string;
}

export interface IEventProfileContent {
  blocks: TemplateBlock[];
  fields: Record<string, IInputFieldConfig>;
}

export interface IEventProfile {
  profile: IProfile;
  content: IEventProfileContent;
  imageIndex: number;
}

export const EventProfileState = {
  EDIT: 'edit',
  READONLY: 'readonly',
  LOCKED: 'locked',
} as const;

export type EventProfileState = (typeof EventProfileState)[keyof typeof EventProfileState];

export interface ITabButtonOption {
  label: string;
  value: string;
}

export interface IEvent {
  id: number;
  eventName: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  organizer: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

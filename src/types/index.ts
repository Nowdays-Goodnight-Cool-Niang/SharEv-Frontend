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

export interface IShareCardDetailsByEvent {
  teamName: string | null;
  position: string | null;
  introductionText: string | null;
}

export interface IShareCard extends IProfile, IShareCardDetailsByEvent {
  registerFlag?: boolean;
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

export interface IEventProfileCardTemplate {
  blocks: TemplateBlock[];
  fields: Record<string, IInputFieldConfig>;
}

export const EventProfileCardState = {
  EDIT: 'edit',
  READONLY: 'readonly',
  LOCKED: 'locked',
} as const;

export type EventProfileCardState =
  (typeof EventProfileCardState)[keyof typeof EventProfileCardState];

export interface ITabButtonOption {
  label: string;
  value: string;
}

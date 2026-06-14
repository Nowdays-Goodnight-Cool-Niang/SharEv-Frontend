export enum EventTabType {
  profile,
  participant,
  QRCamera,
}

export const EventProfileState = {
  EDIT: 'edit',
  READONLY: 'readonly',
  LOCKED: 'locked',
} as const;

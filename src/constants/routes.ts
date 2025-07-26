export const ROUTES = {
  ROOT: '/',
  EVENTS: '/events',
  EVENT: {
    ROOT: '/event',
    WITH_ID: (eventId: string = ':eventId') => `${ROUTES.EVENT.ROOT}/${eventId}`,
  },
  SETTING: '/setting',
  PRIVACY: '/privacy',
  PRIVACY_CONSENT: '/privacy-consent',
  PROFILE_SETUP: '/profile-setup',
  PROFILE_EDIT: '/profile-edit',
  ACCOUNT_DELETON: '/account-deletion',
} as const;

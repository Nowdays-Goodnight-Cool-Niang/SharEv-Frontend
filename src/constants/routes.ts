export const ROUTES = {
  ROOT: '/',
  EVENTS: '/events',
  EVENT: {
    ROOT: '/event',
    WITH_ID: (gatheringId: string) => `/event/${gatheringId}`,
    DETAIL: (gatheringId: string) => `/event/${gatheringId}/detail`,
    EDIT: (gatheringId: string) => `/event/${gatheringId}/edit`,
  },
  SETTING: '/setting',
  PRIVACY: '/privacy',
  PRIVACY_CONSENT: '/privacy-consent',
  PROFILE_SETUP: '/profile-setup',
  PROFILE_EDIT: '/profile-edit',
  ACCOUNT_DELETON: '/account-deletion',
  PARTICIPATED_EVENTS: '/participated-events',
  PARTICIPATED_TEAMS: '/participated-teams',
  TEAM_CREATE: '/teams/create',
} as const;

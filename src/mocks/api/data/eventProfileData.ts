import { EventProfileResponse } from '@/types/api.types';

export const eventProfileData: EventProfileResponse = {
  participantId: 21,
  name: '김주호',
  email: 'eora21@naver.com',
  linkedinUrl: null,
  githubUrl: 'https://github.com/eora21',
  instagramUrl: null,
  introduce: {
    version: 1,
    introduce: '자기소개',
    proudestExperience: '뿌듯했던 경험',
    toughExperience: '힘들었던 경험',
  },
  registerRequireFlag: true,
};

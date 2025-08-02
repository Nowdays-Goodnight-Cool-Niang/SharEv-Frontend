import { IEvent } from '@/types/domain/event';

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

export const placeholders = {
  introduce: '자기소개를 입력하세요',
  proudestExperience: '가장 뿌듯했던 경험을 입력하세요',
  toughExperience: '가장 힘들었던 경험을 입력하세요',
} as const;

export const events: IEvent[] = [
  {
    id: 1,
    eventName: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
    status: 'ongoing',
    organizer: 'GDG Campus Korea',
    startDate: new Date('2025-08-02T10:00:00'),
    endDate: new Date('2025-08-02T18:00:00'),
    location: '구글 스타트업 캠퍼스',
  },
];

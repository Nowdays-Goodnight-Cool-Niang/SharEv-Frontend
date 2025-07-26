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
  {
    id: 5,
    eventName: '테스트용 이벤트입니다',
    status: 'ongoing',
    organizer: '요즘잘자쿨냥이',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전 시작
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2시간 뒤 종료
    location: '온라인 Zoom',
  },
];

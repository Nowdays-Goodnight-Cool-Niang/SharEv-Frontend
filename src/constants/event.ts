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

// TODO: BE에서 placeholder를 내려줄지 협의 필요. 현재는 FE에서 하드코딩
export const placeholders: Record<string, string> = {
  introduce: '자기소개를 입력하세요',
  proudestExperience: '가장 뿌듯했던 경험을 입력하세요',
  toughExperience: '가장 힘들었던 경험을 입력하세요',
};

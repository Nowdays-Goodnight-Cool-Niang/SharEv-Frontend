import {
  CardResponse,
  CardUpdateRequest,
  MyCardResponse,
  ParticipationCheckResponse,
} from '@/types/api/event';
import axios from 'axios';

export const gatheringInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/gathering`,
  withCredentials: true,
});

// 행사 참여 여부 확인
async function checkParticipation(gatheringId: string): Promise<ParticipationCheckResponse> {
  const response = await gatheringInstance.get<ParticipationCheckResponse>(`/${gatheringId}`);
  return response.data;
}

// 내 카드 조회
async function getMyCard(gatheringId: string): Promise<MyCardResponse> {
  const response = await gatheringInstance.get(`/${gatheringId}/cards/me`);
  return response.data;
}

// 행사 참여: 카드 생성
async function participateInGathering(gatheringId: string) {
  const response = await gatheringInstance.post(`/${gatheringId}/cards`);
  return response.data;
}

// 카드 수정 (자기소개 작성)
async function updateMyCard(gatheringId: string, data: CardUpdateRequest) {
  const response = await gatheringInstance.patch(`/${gatheringId}/cards`, data);
  return response.data;
}

// PIN 번호로 카드 조회 (자동 양방향 커넥션)
async function getCardByPin(gatheringId: string, pinNumber: string): Promise<CardResponse> {
  const response = await gatheringInstance.get(`/${gatheringId}/cards/by-pin/${pinNumber}`);
  return response.data;
}

// 모든 카드 조회 (페이지네이션)
async function getCards(
  gatheringId: string,
  { page, size = 20, snapshotTime }: { page: number; size?: number; snapshotTime: string }
) {
  const response = await gatheringInstance.get(`/${gatheringId}/cards`, {
    params: {
      page: page.toString(),
      size,
      snapshotTime,
    },
  });
  return response.data;
}

export const gatheringAPI = {
  checkParticipation,
  getMyCard,
  participateInGathering,
  updateMyCard,
  getCardByPin,
  getCards,
};

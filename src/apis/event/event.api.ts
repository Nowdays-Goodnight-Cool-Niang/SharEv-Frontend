import axios from 'axios';
import {
  EventProfileDetailRequest,
  EventProfileResponse,
  ParticipationCheckResponse,
} from '@/types/api.types';

export const eventInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/events`,
  withCredentials: true,
});

// 본인 프로필 조회
async function getMyProfile(eventId: string): Promise<EventProfileResponse> {
  const response = await eventInstance.get(`/${eventId}/profiles`);
  return response.data;
}

// 행사 참여 여부 확인
async function checkParticipation(eventId: string): Promise<ParticipationCheckResponse> {
  const response = await eventInstance.get<ParticipationCheckResponse>(`/${eventId}`);
  return response.data;
}
// 행사 참여: 본인 프로필 생성
async function participateInEvent(eventId: string) {
  const response = await eventInstance.post(`/${eventId}/profiles`);
  return response.data;
}

// 본인 프로필 수정
async function updateMyProfile(eventId: string, data: EventProfileDetailRequest) {
  const response = await eventInstance.patch(`/${eventId}/profiles`, data);
  return response.data;
}

// PIN 번호로 상대 프로필 조회
async function getProfileByPin(eventId: string, pinNumber: string) {
  const response = await eventInstance.get(`/${eventId}/profiles/${pinNumber}`);
  return response.data;
}

// 참여자 목록 확인
async function getParticipants(
  eventId: string,
  { page, size = 10 }: { page: number; size?: number }
) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);

  const response = await eventInstance.get(`/${eventId}/participants`, {
    params: {
      page: page.toString(),
      size,
      snapshotTime: today.toISOString(),
    },
  });
  console.log(response);
  return response.data;
}

// 도감 등록
async function postParticipant(eventId: string, id: string) {
  const response = await eventInstance.post(`/${eventId}/participants`, { targetPinNumber: id });
  return response.data;
}

export const eventAPI = {
  getMyProfile,
  checkParticipation,
  participateInEvent,
  updateMyProfile,
  getProfileByPin,
  getParticipants,
  postParticipant,
};

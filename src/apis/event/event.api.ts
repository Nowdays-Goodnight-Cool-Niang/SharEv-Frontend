import axios from 'axios';
import { EventProfileDetailRequest, EventProfileResponse } from '@/types/api.types';

export const eventInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/events`,
  withCredentials: true,
});

// 본인 프로필 조회
async function getMyProfile(eventId: string): Promise<EventProfileResponse> {
  const response = await eventInstance.get(`/${eventId}/profiles`);
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

export const eventAPI = {
  getMyProfile,
  participateInEvent,
  updateMyProfile,
  getProfileByPin,
};

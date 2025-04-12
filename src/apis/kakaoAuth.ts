import axios from 'axios';
import { KakaoLoginResponse } from '@/types/response';

export const kakaoAuthInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/login/oauth2/code/kakao`,
  withCredentials: true,
});

export const kakaoAuthAPI = {
  loginWithKakao: async (params: { code: string; state: string }): Promise<KakaoLoginResponse> => {
    const response = await kakaoAuthInstance.get('', { params });
    return response.data;
  },
};

import axios from 'axios';

export const kakaoAuthInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/login/oauth2/code/kakao`,
  withCredentials: true,
});

export const kakaoAuthAPI = {
  loginWithKakao: async (params: { code: string; state: string }) => {
    const response = await kakaoAuthInstance.get('', { params });
    return response.data;
  },
};

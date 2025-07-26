import axios from 'axios';

interface DummyAuthRequest {
  kakaoId: number;
}

interface DummyAuthResponse {
  message: string;
  kakaoId: string;
}

export const dummyInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

// 더미 회원가입
export async function dummySignup(data: DummyAuthRequest): Promise<DummyAuthResponse> {
  const response = await dummyInstance.post('/jmeter/signup', data);
  return response.data;
}

// 더미 로그인
export async function dummyLogin(data: DummyAuthRequest): Promise<DummyAuthResponse> {
  const response = await dummyInstance.post('/jmeter/login', data);
  return response.data;
}

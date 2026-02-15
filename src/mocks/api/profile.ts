import { profileData } from './data/profileData';
import { http, delay } from 'msw';
import { mockConfig } from '../config';
import { mockLogger } from '../utils/logger';
import { getScenarioResponse } from '../utils/scenarios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const profileHandler = [
  http.get(`${baseUrl}/accounts`, async () => {
    mockLogger.request('GET', '/accounts');

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse(profileData);
    mockLogger.response('GET', '/accounts', 200, profileData);

    return response;
  }),
];

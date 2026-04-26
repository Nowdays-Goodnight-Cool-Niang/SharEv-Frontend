import { profileData, linksData } from './data/profileData';
import { http, delay, HttpResponse } from 'msw';
import { mockConfig } from '../config';
import { mockLogger } from '../utils/logger';
import { getScenarioResponse } from '../utils/scenarios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let mockLinks = [...linksData];
let nextLinkId = linksData.length + 1;

export const profileHandler = [
  http.get(`${baseUrl}/accounts`, async () => {
    mockLogger.request('GET', '/accounts');

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse(profileData);
    mockLogger.response('GET', '/accounts', 200, profileData);

    return response;
  }),

  http.get(`${baseUrl}/accounts/links`, async () => {
    mockLogger.request('GET', '/accounts/links');

    await delay(mockConfig.delays.fast);

    mockLogger.response('GET', '/accounts/links', 200, mockLinks);

    return HttpResponse.json(mockLinks);
  }),

  http.post(`${baseUrl}/accounts/links`, async ({ request }) => {
    const body = (await request.json()) as { url: string };
    mockLogger.request('POST', '/accounts/links', body);

    await delay(mockConfig.delays.fast);

    const newLink = { id: nextLinkId++, url: body.url };
    mockLinks.push(newLink);

    mockLogger.response('POST', '/accounts/links', 200, newLink);

    return HttpResponse.json(newLink);
  }),

  http.delete(`${baseUrl}/accounts/links/:linkId`, async ({ params }) => {
    const linkId = Number(params.linkId);
    mockLogger.request('DELETE', `/accounts/links/${linkId}`);

    await delay(mockConfig.delays.fast);

    mockLinks = mockLinks.filter((l) => l.id !== linkId);

    mockLogger.response('DELETE', `/accounts/links/${linkId}`, 200);

    return new HttpResponse(null, { status: 200 });
  }),
];

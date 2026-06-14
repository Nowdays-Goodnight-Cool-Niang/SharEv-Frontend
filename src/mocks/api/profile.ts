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

  http.patch(`${baseUrl}/accounts`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      email: string;
      addLinkUrls?: string[];
      deleteLinkIds?: number[];
    };
    mockLogger.request('PATCH', '/accounts', body);

    await delay(mockConfig.delays.fast);

    if (body.deleteLinkIds) {
      mockLinks = mockLinks.filter((l) => !body.deleteLinkIds!.includes(l.id));
    }
    if (body.addLinkUrls) {
      for (const url of body.addLinkUrls) {
        mockLinks.push({ id: nextLinkId++, url });
      }
    }

    const response = { id: 1, name: body.name, email: body.email, updatedAt: new Date().toISOString() };
    mockLogger.response('PATCH', '/accounts', 200, response);

    return HttpResponse.json(response);
  }),

  http.get(`${baseUrl}/accounts/links`, async () => {
    mockLogger.request('GET', '/accounts/links');

    await delay(mockConfig.delays.fast);

    mockLogger.response('GET', '/accounts/links', 200, mockLinks);

    return HttpResponse.json(mockLinks);
  }),
];

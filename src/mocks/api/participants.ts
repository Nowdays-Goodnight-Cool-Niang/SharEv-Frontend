import { http, HttpResponse, delay } from 'msw';
import { participantsData } from './data/participantsData';

export const participantsHandler = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/participants`, async ({ request }) => {
    console.log(request);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '10');
    const start = page * size;
    const end = start + size;
    const content = participantsData.slice(start, end);
    const totalElements = participantsData.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page >= totalPages - 1;

    const response = {
      registerCount: participantsData.filter((card) => card.registerFlag).length,
      socialDexInfo: {
        content,
        totalElements,
        totalPages,
        number: page,
        last: isLast,
      },
    };
    console.log('Intercepted participants request', response);

    // 1초 지연 추가
    await delay(1000);

    return HttpResponse.json(response);
  }),
];

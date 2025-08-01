import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import mixpanel from 'mixpanel-browser';
import * as Sentry from '@sentry/react';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const enableSentryForTesting = import.meta.env.VITE_ENABLE_SENTRY_TEST === 'true';

if (sentryDsn && (!import.meta.env.DEV || enableSentryForTesting)) {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    environment: import.meta.env.MODE,
    sampleRate: 1.0, // 모든 에러 수집

    integrations: [
      Sentry.browserTracingIntegration({
        enableInp: true,
        enableLongTask: true,
      }),

      Sentry.feedbackIntegration({
        id: 'custom-feedback-widget',
        colorScheme: 'light',
        showBranding: false,
        showEmail: false,
        showName: true,
        autoInject: false, // 기본 버튼 생성 비활성화 - 커스텀 버튼만 사용

        buttonLabel: '💬 피드백',
        submitButtonLabel: '제보하기',
        cancelButtonLabel: '취소하기',
        formTitle: '의견을 들려주세요! 🎯',
        nameLabel: '이름',
        messageLabel: '어떤 점이 불편하셨나요? 개선사항이나 버그를 알려주세요!',
        enableScreenshot: true,
        useSentryUser: {
          email: 'user@example.com',
          username: 'Anonymous User',
        },
        successMessageText: '감사합니다',
        themeLight: {
          submitBackground: '#3B82F6',
          submitBackgroundHover: '#2563EB',
          submitBorder: '#3B82F6',
          submitOutlineFocus: '#93C5FD',
        },
      }),
      // 세션 재생 (매우 유용하지만 용량 많이 사용)
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // 추적할 도메인 지정
    tracePropagationTargets: ['localhost', /^https:\/\/share-v\.kro\.kr\/api/],

    // Business 플랜이므로 더 많은 성능 데이터 수집
    tracesSampleRate: 1.0, // 모든 트랜잭션 추적

    // 세션 재생 샘플링 설정
    replaysSessionSampleRate: 0.1, // 10% 세션만 기록
    replaysOnErrorSampleRate: 1.0, // 에러 발생 시 100% 기록

    // 70명 동접자 대비 성능 임계값 설정
    profilesSampleRate: 0.1, // 10% 프로파일링

    beforeSend(event) {
      if (event.exception) {
        const error = event.exception.values?.[0];
        // 일반적인 브라우저 에러들 제외
        if (
          error?.type === 'ChunkLoadError' ||
          error?.type === 'NetworkError' ||
          error?.type === 'ResizeObserver loop limit exceeded'
        ) {
          return null;
        }
      }

      // 사용자 정보 추가 (개인정보 제외)
      if (event.user) {
        // GA4와 연계를 위한 익명 ID 추가 가능
        event.user.id = event.user.id || 'anonymous';
      }

      return event;
    },
    initialScope: {
      tags: {
        component: 'frontend',
        version: import.meta.env.PACKAGE_VERSION || '1.0.0-prod',
      },
    },
  });
} else if (import.meta.env.DEV) {
  console.log('Sentry disabled in development mode');
} else {
  console.warn('Sentry DSN not found - error tracking disabled');
}

const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN;
if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

async function enableMocking() {
  if (import.meta.env.VITE_MOCKING === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});

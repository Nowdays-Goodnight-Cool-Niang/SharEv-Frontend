# MSW 개선 가이드

## 🎯 개선 사항

### 1. **설정 중앙화** (`config.ts`)

- 응답 지연 시간 통합 관리
- 에러 시나리오 토글
- 로깅 활성화/비활성화

### 2. **로깅 유틸리티** (`utils/logger.ts`)

- 구조화된 MSW 요청/응답 로그
- 개발 중 디버깅 용이

### 3. **시나리오 기반 테스트** (`utils/scenarios.ts`)

- 에러 케이스 시뮬레이션
- 환경변수로 시나리오 제어 가능
- 401, 403, 404, 500 등 다양한 응답

### 4. **데이터 팩토리** (`data/factories.ts`)

- 동적 mock 데이터 생성
- 대량 데이터 테스트 (페이지네이션)
- 재사용 가능한 데이터 생성기

## 🚀 사용 방법

### 기본 사용

```bash
VITE_MOCKING=true npm run dev
```

### 에러 시나리오 테스트

```bash
VITE_MOCK_SCENARIO=error VITE_MOCKING=true npm run dev
```

### 느린 네트워크 시뮬레이션

`config.ts`에서 `defaultDelay`를 `delays.slow`로 변경:

```typescript
export const mockConfig = {
  defaultDelay: delays.slow, // 2000ms
  // ...
};
```

### 로깅 비활성화

```typescript
export const mockConfig = {
  enableLogging: false,
  // ...
};
```

## 📁 개선된 구조

```
src/mocks/
├── config.ts                    # 중앙 설정
├── browser.ts                   # worker 설정
├── handlers.ts                  # handler 집합
├── utils/
│   ├── logger.ts               # 로깅 유틸리티
│   └── scenarios.ts            # 시나리오 응답
└── api/
    ├── event.ts                # 기존 핸들러
    ├── event-improved.ts       # 개선된 핸들러 (예시)
    ├── profile.ts
    └── data/
        ├── eventData.ts
        ├── profileData.ts
        └── factories.ts        # 데이터 팩토리
```

## ✅ 권장 사항

1. **`event-improved.ts` 패턴을 다른 핸들러에도 적용**
2. **시나리오 테스트를 위한 환경변수 설정**

   ```env
   # .env.development
   VITE_MOCKING=true
   VITE_MOCK_SCENARIO=success  # or error, unauthorized, notFound
   ```

3. **팩토리 함수 확장**

   - 다양한 엣지 케이스 데이터 생성
   - 성능 테스트용 대량 데이터

4. **타입 안전성 강화**
   - 모든 mock 데이터를 실제 API 타입으로 검증
   - `factories.ts`에서 타입 추론 활용

## 🧪 테스트 시나리오 예시

```typescript
// 1. 성공 케이스
VITE_MOCK_SCENARIO = success;

// 2. 인증 실패
VITE_MOCK_SCENARIO = unauthorized;

// 3. 서버 에러
VITE_MOCK_SCENARIO = serverError;

// 4. Not Found
VITE_MOCK_SCENARIO = notFound;
```

## 🔄 마이그레이션 가이드

기존 `event.ts`를 `event-improved.ts` 패턴으로 변경:

1. `mockConfig`에서 delay 가져오기
2. `mockLogger`로 로깅 추가
3. `getScenarioResponse`로 응답 래핑
4. 하드코딩된 데이터를 `factories`로 대체

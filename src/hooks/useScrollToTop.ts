import { useEffect } from 'react';

/**
 * 컴포넌트 마운트 시 윈도우 스크롤을 최상단으로 이동시키는 훅입니다.
 *
 * 주로 페이지 전환 시 사용합니다.
 */

export default function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

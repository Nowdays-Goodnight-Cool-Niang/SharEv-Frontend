// 탭 클릭 추적 함수 (GA4 + Mixpanel)
export const trackTabClick = (tabName: string, additionalData?: Record<string, unknown>) => {
  const eventData = {
    tab_name: tabName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };

  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'tab_click', eventData);
  }

  if (typeof window.mixpanel !== 'undefined') {
    window.mixpanel.track('Tab Click', eventData);
  }

  console.log('Tab tracked:', tabName, eventData);
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties);
  }

  if (typeof window.mixpanel !== 'undefined') {
    window.mixpanel.track(eventName, properties);
  }
};

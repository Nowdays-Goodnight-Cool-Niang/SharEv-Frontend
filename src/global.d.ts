declare namespace JSX {
  interface IntrinsicElements {
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare global {
  interface Window {
    gtag: (command: string, targetId?: string, config?: Record<string, unknown>) => void;
    dataLayer: Record<string, unknown>[];
    GA_MEASUREMENT_ID?: string;
    mixpanel: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
  }
}

import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _handledByInterceptor?: boolean;
  }
}

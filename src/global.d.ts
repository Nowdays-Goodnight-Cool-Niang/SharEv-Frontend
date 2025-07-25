declare namespace JSX {
  interface IntrinsicElements {
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _handledByInterceptor?: boolean;
  }
}

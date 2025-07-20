declare namespace JSX {
  interface IntrinsicElements {
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _handledByInterceptor?: boolean;
  }
}

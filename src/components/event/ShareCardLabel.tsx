import { PropsWithChildren } from 'react';

function ShareCardLabel({ children }: PropsWithChildren) {
  return <span className="break-all text-xs font-medium leading-8 text-gray-600">{children}</span>;
}

export default ShareCardLabel;

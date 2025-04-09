import { PropsWithChildren } from 'react';

function ShareCardLabel({ children }: PropsWithChildren) {
  return <span className="break-all text-sm font-medium leading-8 text-gray-400">{children}</span>;
}

export default ShareCardLabel;

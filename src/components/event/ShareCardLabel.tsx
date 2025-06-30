import { PropsWithChildren } from 'react';

function ShareCardLabel({ children }: PropsWithChildren) {
  return <span className="font-gmarket break-all text-xs font-medium leading-7 text-gray-600">{children}</span>;
}

export default ShareCardLabel;

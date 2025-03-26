import { PropsWithChildren } from 'react';

function ShareCardLabel({ children }: PropsWithChildren) {
  return <span className="text-body-3 leading-10 text-gray-400">{children}</span>;
}

export default ShareCardLabel;

import { PropsWithChildren } from 'react';

function Wrapper({ children }: PropsWithChildren) {
  return <div className="h-full px-6">{children}</div>;
}

export default Wrapper;

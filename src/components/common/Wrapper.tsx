import { PropsWithChildren } from 'react';

function Wrapper({ children }: PropsWithChildren<{}>) {
  return <div className="px-6">{children}</div>;
}

export default Wrapper;

import { PropsWithChildren } from 'react';
import Header from './Header';

function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="h-full px-6">
      <Header></Header>
      {children}
    </div>
  );
}

export default Wrapper;

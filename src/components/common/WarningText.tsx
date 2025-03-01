import { PropsWithChildren } from 'react';

function WarningText({ children }: PropsWithChildren) {
  return <p className="label pt-40 text-center text-gray-200">{children}</p>;
}
export default WarningText;

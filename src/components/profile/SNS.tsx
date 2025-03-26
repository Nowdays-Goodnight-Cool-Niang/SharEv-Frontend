import { PropsWithChildren } from 'react';

interface ISNS extends PropsWithChildren {
  onClick: () => void;
}

function SNS({ children, onClick }: ISNS) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-black flex h-6 w-6 items-center justify-center rounded-[.4rem]"
    >
      {children}
    </button>
  );
}

export default SNS;

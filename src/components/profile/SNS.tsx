import { PropsWithChildren } from "react";

interface ISNS extends PropsWithChildren {
  onClick: () => void;
}

function SNS({ children, onClick }: ISNS) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-[.4rem] bg-gray-black flex items-center justify-center"
    >
      {children}
    </button>
  );
}

export default SNS;

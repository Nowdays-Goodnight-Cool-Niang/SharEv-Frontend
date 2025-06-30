import { RefObject } from 'react';

interface CardPortalContainerProps {
  portalRef: RefObject<HTMLDivElement>;
  rotating?: boolean;
  elevated?: boolean;
}

export default function CardPortalContainer({
  portalRef,
  rotating = false,
  elevated = false,
}: CardPortalContainerProps) {
  return (
    <div
      className={`${elevated ? 'z-50' : 'z-0'} absolute inset-0 overflow-x-hidden perspective-[2000px]`}
    >
      <div
        ref={portalRef}
        id="portal"
        className={`relative flex h-full w-full flex-col items-center justify-center transition-transform transform-style-3d ${
          rotating ? 'rotate-x-[0deg]' : '-rotate-x-[50deg]'
        }`}
      ></div>
    </div>
  );
}

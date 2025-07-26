import { PropsWithChildren } from 'react';

export default function ToolTip({ children }: PropsWithChildren) {
  return (
    <div className="animate-tooltip-pop relative mb-2 w-fit rounded-2xl border border-gray-700 bg-gray-700 px-4 py-1.5 text-sm font-medium leading-6 tracking-tight text-white shadow-md dark:border-white dark:bg-white dark:text-gray-800">
      <span className="z-10">{children ?? '텍스트를 입력해 주세요'}</span>
      <div className="absolute bottom-[80%] left-1/2 -z-10 h-3 w-3 rounded-sm bg-gray-700 -translate-x-1/2 rotate-45 dark:bg-white" />
    </div>
  );
}

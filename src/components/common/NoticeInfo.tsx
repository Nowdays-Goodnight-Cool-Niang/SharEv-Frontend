import { PropsWithChildren } from 'react';
import NoticeSvg from '@/assets/icons/ic_notice.svg?react';

function NoticeInfo({ children }: PropsWithChildren) {
  return (
    <span className="text-label-2 flex w-fit items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-50/20 to-blue-100/20 px-4 py-2 text-blue-200 dark:from-gray-700 dark:to-gray-800 dark:text-gray-300">
      <NoticeSvg height={20} width={20} />
      <span className="w-full">{children}</span>
    </span>
  );
}

export default NoticeInfo;

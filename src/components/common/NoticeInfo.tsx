import { PropsWithChildren } from 'react';
import NoticeSvg from '@/assets/icons/ic_notice.svg?react';

interface NoticeInfoProps extends PropsWithChildren {
  type?: 'default' | 'error';
}

function NoticeInfo({ children, type = 'default' }: NoticeInfoProps) {
  const isError = type === 'error';

  const bgColor = isError
    ? 'bg-red-50 dark:from-red-800 dark:to-red-900'
    : 'bg-blue-50 dark:from-gray-700 dark:to-gray-800';

  const textColor = isError ? 'text-red-500 dark:text-red-300' : 'text-blue-500 dark:text-gray-300';

  return (
    <span
      className={`text-label-2 flex w-fit items-center gap-1.5 rounded-xl px-4 py-2 ${bgColor} ${textColor}`}
    >
      <NoticeSvg height={20} width={20} />
      <span className="w-full">{children}</span>
    </span>
  );
}

export default NoticeInfo;

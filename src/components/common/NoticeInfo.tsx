import { PropsWithChildren } from 'react';
import NoticeSvg from '@/assets/icons/ic_notice.svg?react';

function NoticeInfo({ children }: PropsWithChildren) {
  return (
    <span className="text-label-2 flex w-full items-center gap-2 rounded-[4px] border border-orange-500 bg-orange-500/[.15] p-2.5 text-orange-500">
      <NoticeSvg />
      <span className="w-full">{children}</span>
    </span>
  );
}

export default NoticeInfo;

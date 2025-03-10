import NoticeSvg from '../../assets/icons/ic_notice.svg?react';

function NoticeInfo() {
  return (
    <div className="mt-5">
      <span className="text-label-2 flex items-center gap-2 border border-orange-500 bg-orange-500/[.15] p-2.5 text-orange-500">
        <NoticeSvg />
        모든 정보는 다른 사람에게 공개돼요
      </span>
    </div>
  );
}

export default NoticeInfo;

import { showCustomToast } from '@/utils/showToast';

interface TeamInviteLinkProps {
  inviteLink: string;
}

function TeamInviteLink({ inviteLink }: TeamInviteLinkProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      showCustomToast({ message: '초대 링크가 복사되었습니다.' });
    } catch {
      showCustomToast({ message: '링크 복사에 실패했습니다.' });
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4">
      <p className="mb-2 text-xs font-medium text-gray-500">팀 초대 링크</p>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm font-medium text-blue-500">{inviteLink}</span>
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          복사
        </button>
      </div>
    </div>
  );
}

export default TeamInviteLink;

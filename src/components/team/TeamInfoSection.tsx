import type { TeamDetail } from '@/types/domain/team';
import UserSvg from '@/assets/icons/ic_user.svg?react';
import CalendarSvg from '@/assets/icons/ic_calendar.svg?react';
import { formatDate } from '@/utils/format';

interface TeamInfoSectionProps {
  team: TeamDetail;
}

const AVATAR_COLORS = ['#4CAF50', '#FFA726', '#EC407A', '#42A5F5', '#AB47BC', '#26A69A'];

function TeamInfoSection({ team }: TeamInfoSectionProps) {
  const initials = team.title.substring(0, 2);
  const avatarColor = AVATAR_COLORS[team.id % AVATAR_COLORS.length];

  return (
    <div className="flex flex-col items-center pb-6">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
      </div>

      <h2 className="text-xl font-bold text-gray-900">{team.title}</h2>

      <p className="mt-2 text-center text-sm text-gray-500">{team.content}</p>

      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <UserSvg width={14} height={14} className="text-gray-400" />
          <span>{team.headcount}명</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarSvg width={14} height={14} className="text-gray-400" />
          <span>{formatDate(team.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default TeamInfoSection;

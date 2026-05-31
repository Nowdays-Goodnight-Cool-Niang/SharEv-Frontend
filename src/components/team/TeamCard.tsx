import type { Team } from '@/types/domain/team';
import UserSvg from '@/assets/icons/ic_user.svg?react';
import CalendarSvg from '@/assets/icons/ic_calendar.svg?react';
import { formatDate } from '@/utils/format';

interface TeamCardProps {
  team: Team;
  onClick?: (team: Team) => void;
}

const TEAM_COLORS = ['#4CAF50', '#FFA726', '#EC407A', '#42A5F5', '#AB47BC', '#26A69A'];

function TeamCard({ team, onClick }: TeamCardProps) {
  const initials = team.title.substring(0, 2);
  const avatarColor = TEAM_COLORS[team.id % TEAM_COLORS.length];

  return (
    <button
      onClick={() => onClick?.(team)}
      className="w-full rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{team.title}</h3>
        </div>
        {team.memberRole === 'ADMIN' && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            관리자
          </span>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-600">{team.content}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <UserSvg width={16} height={16} className="text-gray-500" />
          <span>{team.headcount}명</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarSvg width={16} height={16} className="text-gray-500" />
          <span>{formatDate(team.createdAt)}</span>
        </div>
      </div>
    </button>
  );
}

export default TeamCard;

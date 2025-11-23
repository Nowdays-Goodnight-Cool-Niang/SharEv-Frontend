import type { Team } from '@/types/domain/team';
import { isVerifiedTeam } from '@/types/domain/team';
import UserSvg from '@/assets/icons/ic_user.svg?react';
import CalendarSvg from '@/assets/icons/ic_calendar.svg?react';
import { formatDate } from '@/utils/format';

interface TeamCardProps {
  team: Team;
  onClick?: (team: Team) => void;
}

function TeamCard({ team, onClick }: TeamCardProps) {
  const getStatusBadge = () => {
    if (isVerifiedTeam(team)) {
      return (
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          인증됨
        </span>
      );
    }
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        미인증
      </span>
    );
  };

  const getTeamInitials = (title: string) => {
    return title.substring(0, 2);
  };

  const getRandomColor = (id: string) => {
    // ID 기반으로 일관된 색상 생성
    const colors = ['#4CAF50', '#FFA726', '#EC407A', '#42A5F5', '#AB47BC', '#26A69A'];
    const index = parseInt(id, 36) % colors.length;
    return colors[index];
  };

  return (
    <button
      onClick={() => onClick?.(team)}
      className="w-full rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
          style={{ backgroundColor: getRandomColor(team.id) }}
        >
          {getTeamInitials(team.title)}
        </div>
        <div className="flex gap-2">{getStatusBadge()}</div>
      </div>

      <h3 className="mb-2 text-lg font-bold text-gray-900">{team.title}</h3>
      <p className="mb-4 text-sm text-gray-600">{team.content}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <UserSvg width={16} height={16} className="text-gray-500" />
          <span>{team.participantCount}명</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarSvg width={16} height={16} className="text-gray-500" />
          <span>{formatDate(team.createAt)}</span>
        </div>
      </div>
    </button>
  );
}

export default TeamCard;

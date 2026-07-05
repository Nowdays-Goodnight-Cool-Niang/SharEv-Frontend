import { useState } from 'react';
import { TEAM_TYPE_OPTIONS } from '@/types/domain/team';
import type { TeamDetail } from '@/types/domain/team';
import UserSvg from '@/assets/icons/ic_user.svg?react';
import CalendarSvg from '@/assets/icons/ic_calendar.svg?react';
import { formatDate } from '@/utils/format';

interface TeamInfoSectionProps {
  team: TeamDetail;
}

const AVATAR_COLORS = ['#4CAF50', '#FFA726', '#EC407A', '#42A5F5', '#AB47BC', '#26A69A'];


function TeamInfoSection({ team }: TeamInfoSectionProps) {
  const [showTypeTooltip, setShowTypeTooltip] = useState(false);
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

      <div className="relative mt-2 flex items-center gap-1">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            team.certification === 'CERTIFICATED'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {TEAM_TYPE_OPTIONS[team.certification].label}
        </span>
        <button
          onClick={() => setShowTypeTooltip((prev) => !prev)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        {showTypeTooltip && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowTypeTooltip(false)} />
            <div className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap animate-tooltip-pop rounded-xl bg-gray-700 px-3 py-2 text-xs text-white shadow-lg">
              {TEAM_TYPE_OPTIONS[team.certification].description}
              <div className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-700" />
            </div>
          </>
        )}
      </div>

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

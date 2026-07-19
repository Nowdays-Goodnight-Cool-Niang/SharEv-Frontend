import { useState } from 'react';
import type { TeamMember, MemberRoleType } from '@/types/domain/team';

interface TeamMemberItemProps {
  member: TeamMember;
  isAdmin?: boolean;
  onRoleChange?: (email: string, newRole: MemberRoleType) => void;
  onRemove?: (email: string) => void;
}

const MEMBER_AVATAR_COLORS = ['#EC407A', '#FFA726', '#AB47BC', '#42A5F5', '#26A69A', '#4CAF50'];

function TeamMemberItem({ member, isAdmin = false, onRoleChange, onRemove }: TeamMemberItemProps) {
  const [isActionOpen, setIsActionOpen] = useState(false);

  const avatarColor =
    MEMBER_AVATAR_COLORS[member.name.charCodeAt(0) % MEMBER_AVATAR_COLORS.length];
  const initial = member.name.substring(0, 1);
  const toggledRole: MemberRoleType = member.role === 'ADMIN' ? 'COMMON' : 'ADMIN';

  return (
    <div className="relative flex items-center gap-3 py-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{member.name}</span>
          {member.role === 'ADMIN' && (
            <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
              관리자
            </span>
          )}
        </div>
        <p className="truncate text-sm text-gray-400">{member.email}</p>
      </div>

      {isAdmin && (
        <div className="relative">
          <button
            onClick={() => setIsActionOpen((prev) => !prev)}
            className="p-1 text-gray-400"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {isActionOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsActionOpen(false)} />
              <ul className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <li>
                  <button
                    onClick={() => {
                      setIsActionOpen(false);
                      onRoleChange?.(member.email, toggledRole);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {toggledRole === 'ADMIN' ? '관리자로 변경' : '일반 멤버로 변경'}
                  </button>
                </li>
                <li className="border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsActionOpen(false);
                      onRemove?.(member.email);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-red-500 transition-colors hover:bg-gray-50"
                  >
                    내보내기
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamMemberItem;

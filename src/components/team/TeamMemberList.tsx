import { useState } from 'react';
import type { TeamMember, MemberRoleType } from '@/types/domain/team';
import TeamMemberItem from './TeamMemberItem';

interface TeamMemberListProps {
  members: TeamMember[];
  isAdmin?: boolean;
  onInvite?: (email: string) => void;
  onRoleChange?: (email: string, newRole: MemberRoleType) => void;
  onRemove?: (email: string) => void;
  isInviting?: boolean;
}

function TeamMemberList({
  members,
  isAdmin = false,
  onInvite,
  onRoleChange,
  onRemove,
  isInviting = false,
}: TeamMemberListProps) {
  const [email, setEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInvite = () => {
    if (!isValidEmail || isInviting) return;
    onInvite?.(email);
    setEmail('');
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">팀원</h3>
        <span className="text-sm text-gray-400">{members.length}명</span>
      </div>

      {/* 초대 입력 - ADMIN만 */}
      {isAdmin && (
        <div className="mb-2 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일로 초대하기"
            onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleInvite}
            disabled={!isValidEmail || isInviting}
            className="shrink-0 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isInviting ? '초대 중...' : '초대'}
          </button>
        </div>
      )}

      <div className="rounded-xl border border-gray-100 bg-white px-5">
        {members.map((member, index) => (
          <div
            key={member.email}
            className={index < members.length - 1 ? 'border-b border-gray-50' : ''}
          >
            <TeamMemberItem
              member={member}
              isAdmin={isAdmin}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMemberList;

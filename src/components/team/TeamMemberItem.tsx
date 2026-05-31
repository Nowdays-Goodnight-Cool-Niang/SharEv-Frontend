import type { TeamMember } from '@/types/domain/team';

interface TeamMemberItemProps {
  member: TeamMember;
}

const MEMBER_AVATAR_COLORS = ['#EC407A', '#FFA726', '#AB47BC', '#42A5F5', '#26A69A', '#4CAF50'];

function TeamMemberItem({ member }: TeamMemberItemProps) {
  const avatarColor =
    MEMBER_AVATAR_COLORS[
      member.name.charCodeAt(0) % MEMBER_AVATAR_COLORS.length
    ];
  const initial = member.name.substring(0, 1);

  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{member.name}</span>
        </div>
        <p className="truncate text-sm text-gray-400">{member.email}</p>
      </div>
    </div>
  );
}

export default TeamMemberItem;

import type { TeamMember } from '@/types/domain/team';
import TeamMemberItem from './TeamMemberItem';

interface TeamMemberListProps {
  members: TeamMember[];
}

function TeamMemberList({ members }: TeamMemberListProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">팀원</h3>
        <span className="text-sm text-gray-400">{members.length}명</span>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white px-5">
        {members.map((member, index) => (
          <div
            key={member.email}
            className={index < members.length - 1 ? 'border-b border-gray-50' : ''}
          >
            <TeamMemberItem member={member} />
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-gray-300">
        팀원 관리 기능은 추후 업데이트 예정입니다
      </p>
    </div>
  );
}

export default TeamMemberList;

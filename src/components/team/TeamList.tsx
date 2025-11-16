import type { Team } from '@/types/domain/team';
import TeamCard from './TeamCard';

interface TeamListProps {
  teams: Team[];
  onTeamClick?: (team: Team) => void;
}

function TeamList({ teams, onTeamClick }: TeamListProps) {
  if (teams.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">참여한 팀이 없습니다.</p>
        <p className="mt-2 text-xs text-gray-400">새로운 팀을 생성하거나 초대를 받아보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} onClick={onTeamClick} />
      ))}
    </div>
  );
}

export default TeamList;

import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TeamHeader from '@/components/team/TeamHeader';
import TeamList from '@/components/team/TeamList';
import { useTeams } from '@/hooks/useTeams';
import { showCustomToast } from '@/utils/showToast';
import type { Team } from '@/types/domain/team';

function ParticipatedTeams() {
  const { teams, isLoading, error } = useTeams();

  const handleCreateTeam = () => {
    showCustomToast({ message: '팀 생성 기능은 준비 중입니다.' });
  };

  const handleTeamClick = (team: Team) => {
    // TODO: 팀 상세 페이지로 이동
    showCustomToast({ message: `${team.title} 팀 상세 페이지로 이동` });
  };

  if (error) {
    return (
      <div className="background flex min-h-full flex-col bg-gray-50">
        <Header title="참여 팀" showBackButton />
        <div className="wrapper flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-500">{error.message}</p>
          </div>
        </div>
        <BottomSpace />
      </div>
    );
  }

  return (
    <div className="background flex min-h-full flex-col bg-gray-50">
      <Header title="참여 팀" showBackButton />
      <div className="wrapper py-4">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <TeamHeader teamCount={teams.length} onCreateTeam={handleCreateTeam} />
            <TeamList teams={teams} onTeamClick={handleTeamClick} />
          </>
        )}
      </div>
      <BottomSpace />
    </div>
  );
}

export default ParticipatedTeams;

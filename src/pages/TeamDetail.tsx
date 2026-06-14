import { useParams, useNavigate } from 'react-router';
import ArrowLeftSvg from '@/assets/icons/ic_arrow_left.svg?react';
import BottomSpace from '@/components/common/BottomSpace';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TeamInfoSection from '@/components/team/TeamInfoSection';
import TeamInviteLink from '@/components/team/TeamInviteLink';
import TeamGatheringList from '@/components/team/TeamGatheringList';
import TeamMemberList from '@/components/team/TeamMemberList';
import { useTeamDetail } from '@/hooks/useTeamDetail';
import { showCustomToast } from '@/utils/showToast';
import type { TeamGathering } from '@/types/domain/team';

function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { teamDetail, isLoading, error } = useTeamDetail(teamId ?? '');

  const handleParticipate = (gathering: TeamGathering) => {
    showCustomToast({ message: `${gathering.title} 참여하기` });
  };

  const handleDeleteGathering = (gathering: TeamGathering) => {
    showCustomToast({ message: `${gathering.title} 삭제 기능은 준비 중입니다.` });
  };

  if (error) {
    return (
      <div className="background flex min-h-full flex-col bg-gray-50">
        <header className="wrapper sticky top-0 z-50 flex min-h-14 items-center bg-white">
          <button onClick={() => navigate(-1)} className="text-gray-900">
            <ArrowLeftSvg />
          </button>
        </header>
        <div className="wrapper flex flex-1 items-center justify-center">
          <p className="text-sm text-red-500">{error.message}</p>
        </div>
        <BottomSpace />
      </div>
    );
  }

  return (
    <div className="background flex min-h-full flex-col bg-gray-50">
      <header className="wrapper sticky top-0 z-50 flex min-h-14 items-center justify-between bg-white">
        <button onClick={() => navigate(-1)} className="text-gray-900">
          <ArrowLeftSvg />
        </button>
        <button
          onClick={() => showCustomToast({ message: '더보기 기능은 준비 중입니다.' })}
          className="p-1 text-gray-500"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </header>

      <div className="wrapper py-4">
        {isLoading || !teamDetail ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <TeamInfoSection team={teamDetail} />
            {teamDetail.inviteLink && <TeamInviteLink inviteLink={teamDetail.inviteLink} />}
            <TeamGatheringList
              gatherings={teamDetail.gatherings}
              onParticipate={handleParticipate}
              onDelete={handleDeleteGathering}
            />
            <TeamMemberList members={teamDetail.members} />
          </>
        )}
      </div>
      <BottomSpace />
    </div>
  );
}

export default TeamDetail;

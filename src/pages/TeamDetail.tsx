import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ArrowLeftSvg from '@/assets/icons/ic_arrow_left.svg?react';
import BottomSpace from '@/components/common/BottomSpace';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TeamInfoSection from '@/components/team/TeamInfoSection';
import TeamInviteLink from '@/components/team/TeamInviteLink';
import TeamGatheringList from '@/components/team/TeamGatheringList';
import TeamMemberList from '@/components/team/TeamMemberList';
import TeamEditModal from '@/components/team/TeamEditModal';
import { useTeamDetail } from '@/hooks/useTeamDetail';
import { useMutateUpdateTeam } from '@/hooks/useMutateUpdateTeam';
import { useMutateInviteMember } from '@/hooks/useMutateInviteMember';
import { useMutateRemoveMember } from '@/hooks/useMutateRemoveMember';
import { useMutateUpdateMemberRole } from '@/hooks/useMutateUpdateMemberRole';
import { showCustomToast } from '@/utils/showToast';
import { ROUTES } from '@/constants/routes';
import type { TeamGathering, MemberRoleType } from '@/types/domain/team';

function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const id = teamId ?? '';

  const { teamDetail, isLoading, error } = useTeamDetail(id);
  const { mutate: updateTeam, isPending: isUpdatePending } = useMutateUpdateTeam(id);
  const { mutate: inviteMember, isPending: isInviting } = useMutateInviteMember(id);
  const { mutate: removeMember } = useMutateRemoveMember(id);
  const { mutate: updateMemberRole } = useMutateUpdateMemberRole(id);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const isAdmin = teamDetail?.members.some(
    (m) => m.role === 'ADMIN' && m.email === 'chichoc.dev@gmail.com',
  );

  const handleParticipate = (gathering: TeamGathering) => {
    showCustomToast({ message: `${gathering.title} 참여하기` });
  };

  const handleEditGathering = (gathering: TeamGathering) => {
    navigate(ROUTES.EVENT.EDIT(gathering.id));
  };

  const handleEditSave = (data: { title: string; content: string }) => {
    updateTeam(
      { title: data.title, content: data.content },
      {
        onSuccess: () => {
          showCustomToast({ message: '팀 정보가 수정되었습니다.' });
          setIsEditOpen(false);
        },
        onError: () => {
          showCustomToast({ message: '팀 정보 수정에 실패했습니다.' });
        },
      },
    );
  };

  const handleInvite = (email: string) => {
    inviteMember(
      { email },
      {
        onSuccess: () => showCustomToast({ message: '초대가 완료되었습니다.' }),
        onError: () =>
          showCustomToast({ message: '초대에 실패했습니다. 이미 초대된 멤버일 수 있습니다.' }),
      },
    );
  };

  const handleRoleChange = (email: string, newRole: MemberRoleType) => {
    // mock에서는 email 기반, 실제 API 연동 시 memberId 기반으로 전환 필요
    const member = teamDetail?.members.find((m) => m.email === email);
    if (!member) return;

    updateMemberRole(
      { memberId: 0, data: { role: newRole } },
      {
        onSuccess: () =>
          showCustomToast({
            message: `${member.name}님의 역할이 ${newRole === 'ADMIN' ? '관리자' : '일반 멤버'}로 변경되었습니다.`,
          }),
        onError: () => showCustomToast({ message: '역할 변경에 실패했습니다.' }),
      },
    );
  };

  const handleRemoveMember = (email: string) => {
    const member = teamDetail?.members.find((m) => m.email === email);
    if (!member) return;

    // mock에서는 email 기반, 실제 API 연동 시 memberId 기반으로 전환 필요
    removeMember(0, {
      onSuccess: () => showCustomToast({ message: `${member.name}님을 내보냈습니다.` }),
      onError: () => showCustomToast({ message: '멤버 제거에 실패했습니다.' }),
    });
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
        {isAdmin && (
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-1 text-gray-500 active:text-gray-700"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
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
              onEdit={isAdmin ? handleEditGathering : undefined}
            />
            <TeamMemberList
              members={teamDetail.members}
              isAdmin={isAdmin}
              onInvite={handleInvite}
              onRoleChange={handleRoleChange}
              onRemove={handleRemoveMember}
              isInviting={isInviting}
            />
          </>
        )}
      </div>
      <BottomSpace />

      {teamDetail && (
        <TeamEditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          team={teamDetail}
          onSave={handleEditSave}
          isPending={isUpdatePending}
        />
      )}
    </div>
  );
}

export default TeamDetail;

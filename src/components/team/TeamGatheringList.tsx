import type { TeamGathering } from '@/types/domain/team';
import TeamGatheringCard from './TeamGatheringCard';

interface TeamGatheringListProps {
  gatherings: TeamGathering[];
  onParticipate?: (gathering: TeamGathering) => void;
  onEdit?: (gathering: TeamGathering) => void;
}

function TeamGatheringList({ gatherings, onParticipate, onEdit }: TeamGatheringListProps) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">팀 행사</h3>
        <span className="text-sm text-gray-400">{gatherings.length}개</span>
      </div>

      <div className="flex flex-col gap-3">
        {gatherings.map((gathering, index) => (
          <TeamGatheringCard
            key={index}
            gathering={gathering}
            onParticipate={onParticipate}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamGatheringList;

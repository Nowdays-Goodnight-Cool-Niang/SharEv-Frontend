interface TeamHeaderProps {
  teamCount: number;
  onCreateTeam: () => void;
}

function TeamHeader({ teamCount, onCreateTeam }: TeamHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h3 className="text-base font-semibold text-gray-700">총 {teamCount}개 팀</h3>
      <button
        onClick={onCreateTeam}
        className="ml-auto rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 active:bg-blue-700"
      >
        + 팀 생성
      </button>
    </div>
  );
}

export default TeamHeader;

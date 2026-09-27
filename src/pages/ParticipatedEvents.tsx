import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import EventCard from '@/components/events/EventCard';
import EventCardSkeleton from '@/components/events/EventCardSkeleton';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { teamAPI } from '@/apis/teams';
import { IGathering } from '@/types/domain/event';
import { Team } from '@/types/domain/team';
import { getEventStatus } from '@/utils/eventStatus';
import useScrollToTop from '@/hooks/useScrollToTop';

type EventView = 'participated' | 'managed';

function sortGatherings(gatherings: IGathering[]) {
  const statusOrder = { ongoing: 0, upcoming: 1, ended: 2 };
  return [...gatherings].sort((a, b) => {
    const statusA = getEventStatus(new Date(a.startAt), new Date(a.endAt));
    const statusB = getEventStatus(new Date(b.startAt), new Date(b.endAt));
    if (statusOrder[statusA] !== statusOrder[statusB]) {
      return statusOrder[statusA] - statusOrder[statusB];
    }
    return new Date(b.startAt).getTime() - new Date(a.startAt).getTime();
  });
}

function ParticipatedEvents() {
  useScrollToTop();
  const navigate = useNavigate();
  const [view, setView] = useState<EventView>('participated');
  const [teamId, setTeamId] = useState<number | 'all'>('all');

  const participatedQuery = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'me'],
    queryFn: gatheringAPI.getMyGatherings,
  });
  const teamsQuery = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: teamAPI.getTeams,
  });
  const adminTeams = useMemo(
    () => (teamsQuery.data ?? []).filter((team) => team.memberRole === 'ADMIN'),
    [teamsQuery.data]
  );
  const managedQuery = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'managed', adminTeams.map((team) => team.id)],
    queryFn: () => teamAPI.getManagedGatherings(adminTeams),
    enabled: view === 'managed' && teamsQuery.isSuccess && adminTeams.length > 0,
  });

  const participated = useMemo(
    () => sortGatherings(participatedQuery.data ?? []),
    [participatedQuery.data]
  );
  const managed = useMemo(() => sortGatherings(managedQuery.data ?? []), [managedQuery.data]);
  const teams = useMemo(() => {
    const unique = new Map<number, string>();
    managed.forEach((gathering) => {
      if (gathering.teamId && gathering.teamName) unique.set(gathering.teamId, gathering.teamName);
    });
    return [...unique.entries()].map(([id, name]) => ({ id, name }));
  }, [managed]);
  const filteredManaged =
    teamId === 'all' ? managed : managed.filter((gathering) => gathering.teamId === teamId);
  const hasManagedView = teamsQuery.isLoading || adminTeams.length > 0;
  const isLoading =
    view === 'participated'
      ? participatedQuery.isLoading
      : teamsQuery.isLoading || managedQuery.isLoading;
  const isError =
    view === 'participated'
      ? participatedQuery.isError
      : teamsQuery.isError || managedQuery.isError;
  const visibleGatherings = view === 'participated' ? participated : filteredManaged;

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="내 행사" showBackButton />

      <div className="wrapper py-3">
        <div className="flex rounded-full bg-gray-100 p-1 dark:bg-gray-800">
          {(hasManagedView
            ? ([
                ['participated', '참여 행사'],
                ['managed', '관리 행사'],
              ] as const)
            : ([['participated', '참여 행사']] as const)
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`h-10 flex-1 rounded-full text-sm font-medium transition-colors ${
                view === key
                  ? 'bg-white text-gray-700 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'managed' && teams.length > 1 && (
        <div className="scroll-hide flex gap-2 overflow-x-auto px-6 pb-3">
          <TeamFilterChip
            label="전체"
            count={managed.length}
            selected={teamId === 'all'}
            onClick={() => setTeamId('all')}
          />
          {teams.map((team) => (
            <TeamFilterChip
              key={team.id}
              label={team.name}
              count={managed.filter((gathering) => gathering.teamId === team.id).length}
              selected={teamId === team.id}
              onClick={() => setTeamId(team.id)}
            />
          ))}
        </div>
      )}

      <div className="wrapper space-y-5 py-2">
        {isError ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              행사 목록을 불러오지 못했어요
            </p>
            <button
              onClick={() =>
                view === 'participated'
                  ? participatedQuery.refetch()
                  : Promise.all([teamsQuery.refetch(), managedQuery.refetch()])
              }
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              다시 시도
            </button>
          </div>
        ) : isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => <EventCardSkeleton key={idx} />)
        ) : visibleGatherings.length > 0 ? (
          visibleGatherings.map((gathering) => (
            <EventCard
              key={gathering.id}
              gathering={gathering}
              isParticipating={view === 'participated'}
              mode={view === 'managed' ? 'manage' : 'participate'}
              hideButton={
                view === 'participated' &&
                getEventStatus(new Date(gathering.startAt), new Date(gathering.endAt)) === 'ended'
              }
            />
          ))
        ) : (
          <EmptyView view={view} onBrowse={() => navigate('/events')} />
        )}
      </div>
      <BottomSpace />
    </div>
  );
}

function TeamFilterChip({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium ${
        selected
          ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
          : 'border border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      {label}
      <span className={selected ? 'text-gray-300 dark:text-gray-500' : 'text-gray-300'}>
        {count}
      </span>
    </button>
  );
}

function EmptyView({ view, onBrowse }: { view: EventView; onBrowse: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {view === 'participated' ? '아직 참여한 행사가 없어요' : '관리할 수 있는 행사가 없어요'}
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {view === 'participated'
            ? '행사에서 내 카드를 만들면 여기에 표시돼요'
            : '관리자인 팀에 행사가 생기면 여기에 표시돼요'}
        </p>
      </div>
      {view === 'participated' && (
        <button
          onClick={onBrowse}
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          이벤트 둘러보기
        </button>
      )}
    </div>
  );
}

export default ParticipatedEvents;

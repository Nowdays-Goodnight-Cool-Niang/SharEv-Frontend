import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';
import GridGraySvg from '@/assets/icons/ic_grid_gray.svg?react';
import StackGraySvg from '@/assets/icons/ic_stack_gray.svg?react';
import ViewTabs from './ViewTabs';
import { useEffect, useRef, useState } from 'react';
import CardSlider from './CardSlider';
import { getGraphicImageByNumber } from '@/utils/graphic';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';
import { EVENT_ID } from '@/constants/eventId';
import ParticipationInfo from './ParticipationInfo';
import SpotlightCard from '../card/SpotlightCard';
import { IEventProfile } from '@/types/domain/event';
import ParticipantsEmptyView from './ParticipantsEmptyView';
import { showPreview } from '@/utils/showPreview';

export default function ParticipantsSection() {
  const [viewMode, setViewMode] = useState('grid');
  const [currentProfile, setCurrentProfile] = useState<IEventProfile | null>(null);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useQueryParticipants(EVENT_ID);
  const observerRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const profiles = data?.pages.flatMap((page) => page.profiles) ?? [];
  const showEmptyView = !isLoading && profiles.length === 0;

  return (
    <>
      <div className="w-full">
        {currentProfile && (
          <SpotlightCard
            profile={currentProfile}
            eventName="CODE:ME"
            onClose={() => setCurrentProfile(null)}
            showLinkIcons
          />
        )}
        <div className="wrapper sticky top-14 z-20 my-2 flex h-12 w-full items-center justify-between gap-3 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">참가자 명함</h3>
          </div>

          <div className="flex items-center justify-between">
            <ViewTabs
              tabs={[
                {
                  key: 'grid',
                  icon: {
                    active: <GridSvg width={20} height={20} />,
                    inactive: <GridGraySvg className="dark:opacity-35" width={20} height={20} />,
                  },
                  label: '전체',
                  value: 'grid',
                },
                {
                  key: 'slide',
                  icon: {
                    active: <StackSvg width={20} height={20} />,
                    inactive: <StackGraySvg className="dark:opacity-35" width={20} height={20} />,
                  },
                  label: '하나씩',
                  value: 'slide',
                },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          </div>
        </div>

        {showEmptyView && (
          <div className="wrapper">
            <ParticipantsEmptyView />
          </div>
        )}

        {viewMode === 'grid' && (
          <ul className="wrapper mt-4 grid grid-cols-2 gap-3">
            {isLoading &&
              profiles.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={`skeleton-${i}`}
                  className="aspect-square w-full animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            {profiles.map((profile, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <li
                  onClick={() => {
                    if (profile.relationFlag) setCurrentProfile(profile);
                    else {
                      showPreview({
                        message: `저의 가장 뿌듯했던 경험은 ${profile.template.fields.proudestExperience.value}입니다.`,
                      });
                    }
                  }}
                  key={i}
                  ref={isLast ? observerRef : null}
                  className={`relative flex aspect-square w-full flex-col items-center gap-4 overflow-hidden rounded-2xl ${profile.relationFlag ? 'bg-gradient-to-br from-blue-500 to-blue-400' : 'bg-gray-50'}`}
                >
                  <div className="z-10 flex h-full w-full flex-col gap-1 px-4 pb-5 pt-5">
                    <div className="flex flex-col">
                      <p
                        className={`w-full text-xl font-semibold leading-7 tracking-tight ${profile.relationFlag ? 'text-white' : 'text-gray-500'}`}
                      >
                        {profile.name}
                      </p>
                    </div>
                    {!profile.relationFlag && (
                      <button className="flex w-fit flex-col items-center justify-center rounded-lg text-sm tracking-tight text-gray-400">
                        미리보기 →
                      </button>
                    )}
                  </div>
                  <div className="absolute bottom-0 flex aspect-square w-full flex-col items-center justify-center">
                    <img
                      src={getGraphicImageByNumber(profile.iconNumber)}
                      className={`${!profile.relationFlag && 'opacity-20 brightness-75 filter'} translate-x-14 translate-y-16 scale-125`}
                    />
                  </div>
                </li>
              );
            })}
            {isFetchingNextPage &&
              hasNextPage &&
              Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={`skeleton-${i}`}
                  className="aspect-square w-full animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
          </ul>
        )}
        {viewMode === 'slide' && (
          <CardSlider
            profiles={profiles}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
      <div className="wrapper fixed bottom-20 z-30 flex flex-col items-center">
        <ParticipationInfo
          totalCount={data?.pages?.[0]?.page.totalElements ?? 0}
          registerCount={data?.pages?.[0]?.registerCount ?? 0}
        />
      </div>
    </>
  );
}

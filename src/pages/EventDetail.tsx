// @ts-nocheck
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import ButtonPrimary from '../components/common/ButtonPrimary';
import ButtonSecondary from '../components/common/ButtonSecondary';
import Wrapper from '../components/common/Wrapper';
import Header from '../components/eventDetail/Header';
import Tab from '../components/eventDetail/Tab';
import { useQueryEvent } from '../hooks/useQueryEvent';
import { getEventStatus } from '../utils/event';
import OpenInNewSvg from '../assets/icons/ic_open_in_new.svg?react';
import { formatDate } from '../utils/date';
import Tag from '../components/common/Tag';
import EventParticipants from '../components/eventDetail/EventParticipants';
import WarningText from '../components/common/WarningText';
import ProfileCard from '../components/common/ProfileCard';
import { useParticipantProfileStore } from '../stores/useParticipantProfileStore';

enum TabType {
  info = 'info',
  people = 'people',
}

function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, isLoading, error } = useQueryEvent(eventId!);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    isOpen: isProfileOpen,
    setOpen: setProfileOpen,
    participantProfile,
    setParticipantProfile,
  } = useParticipantProfileStore();

  const updateSearchParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams, { replace: true });
  };

  useEffect(() => {
    const tab = searchParams.get('tab');

    if (!tab) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', 'info');
      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, []);

  if (isLoading) return <div>데이터를 받아오고 있습니다...</div>;
  if (error) return <div>에러가 발생했어요: {error.message}</div>;

  return (
    <main className="min-h-screen bg-gray-30">
      <Header></Header>
      <Wrapper>
        <div className="flex flex-col pb-10">
          <div className="mb-5 mt-7 h-52 w-full overflow-hidden rounded-xl bg-slate-100">
            <img className="img-cover w-full" src={event.imageUrl} />
          </div>
          <div className="mb-2 flex">
            <Tag>{getEventStatus(event?.startedAt, event?.endedAt)}</Tag>
          </div>

          <h1 className="text-title mb-6 text-gray-black">{event?.title}</h1>
          <div className="mb-6 flex items-center justify-between gap-x-1 rounded-xl bg-gray-50 p-1">
            <Tab
              text="행사 정보"
              onClick={() => updateSearchParams('tab', 'info')}
              isActive={searchParams.get('tab') === 'info'}
            />
            <Tab
              text="참여하는 사람들"
              onClick={() => updateSearchParams('tab', 'people')}
              isActive={searchParams.get('tab') === 'people'}
            />
          </div>
          {searchParams.get('tab') === TabType.info && (
            <div>
              <ul className="mb-5 flex flex-col gap-3 border-b border-t border-solid border-gray-70 py-3">
                <li className="flex">
                  <h2 className="text-label min-w-12 text-gray-300">장소</h2>
                  <span className="text-label4 text-gray-500">{event?.place}</span>
                </li>
                <li className="flex">
                  <h2 className="text-label min-w-12 text-gray-300">주최자</h2>
                  <span className="text-label4 text-gray-500">{event?.organizer}</span>
                </li>
                <li className="flex">
                  <h2 className="text-label min-w-12 text-gray-300">일시</h2>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-x-2">
                      <div className="rounded-[.4rem] bg-blue-100 p-1 text-[.8rem] font-bold text-blue-500">
                        시작일자
                      </div>
                      <span className="text-label4 text-gray-500">
                        {formatDate(event?.startedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="rounded-[.4rem] bg-blue-100 p-1 text-[.8rem] font-bold text-blue-500">
                        종료일자
                      </div>
                      <span className="text-label4 text-gray-500">
                        {formatDate(event?.endedAt)}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <h2 className="text-label mb-2 text-gray-300">행사 소개</h2>
              <p className="text-body mb-4 text-gray-500">{event?.content}</p>
              <ButtonSecondary
                onClick={() => {
                  window.open(event?.eventUrl, '_blank');
                }}
                children={
                  <div className="flex items-center justify-center gap-2">
                    <span>자세한 정보 보러가기</span>
                    <OpenInNewSvg />
                  </div>
                }
              ></ButtonSecondary>
            </div>
          )}
          {searchParams.get('tab') === TabType.people && event?.registration && (
            <EventParticipants eventId={event.id} />
          )}
          {searchParams.get('tab') === TabType.people && !event?.registration && (
            <WarningText>행사에 참여하면 확인할 수 있습니다</WarningText>
          )}
          {!event.registration && (
            <div className="fixed bottom-8 left-4 right-4 max-w-full">
              <ButtonPrimary
                children={<span>이 행사에 참여해요</span>}
                onClick={() => {
                  navigate(`profile`);
                }}
              ></ButtonPrimary>
            </div>
          )}
        </div>
      </Wrapper>
      {isProfileOpen && (
        <div className="z-10 bg-gray-black/90">
          <ProfileCard
            id={participantProfile?.id || 0}
            name={participantProfile?.name || ''}
            phone={participantProfile?.phone || ''}
            profileImageId={participantProfile?.profileImageId || 1}
            github={participantProfile?.github || ''}
            instagram={participantProfile?.instagram || ''}
            facebook={participantProfile?.facebook || ''}
            jobGroup={participantProfile?.jobGroup || ''}
            teamName={participantProfile?.teamName || ''}
            projectInfo={participantProfile?.projectInfo || ''}
            onInputChange={(key, value) => {
              setParticipantProfile({ ...participantProfile, [key]: value });
            }}
          />
        </div>
      )}
    </main>
  );
}

export default EventDetail;

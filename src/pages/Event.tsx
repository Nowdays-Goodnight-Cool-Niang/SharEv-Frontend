import { Link } from 'react-router';
import Tag from '../components/common/Tag';
import WarningText from '../components/common/WarningText';
import Wrapper from '../components/common/Wrapper';
import Header from '../components/event/Header';
import { useQueryEvents } from '../hooks/useQueryEvents';
import { formatDate } from '../utils/date';
import { getEventStatus } from '../utils/event';
import toast, { Toaster } from 'react-hot-toast';

function Event() {
  const { events, isLoading, error } = useQueryEvents();

  if (isLoading) return <div>데이터를 받아오고 있습니다...</div>;
  if (error) return <div>에러가 발생했어요: {error.message}</div>;

  return (
    <main className="flex min-h-screen flex-col bg-gray-30 pb-10">
      <Header></Header>
      <Wrapper>
        <div className="mb-8 mt-7 flex items-center justify-between">
          <h1 className="text-title text-left text-gray-black">
            참여 가능한 행사를
            <br />
            확인하세요
          </h1>
          <button
            onClick={() => toast('추후 개발할 예정입니다')}
            className="text-label rounded-lg bg-gray-70 px-4 py-2 text-gray-500"
          >
            행사 주최하기
          </button>
        </div>
        <ul className="flex flex-col gap-7">
          {events?.length === 0 && <WarningText>아직 행사가 없습니다.</WarningText>}
          {events!.map((event) => (
            <Link to={`${event.id}`}>
              <li className="" key={event.id}>
                <div className="mb-4 h-36 w-full overflow-hidden rounded-xl bg-slate-100">
                  <img className="img-cover w-full" src={event.imageUrl} />
                </div>
                <div className="mb-3 flex gap-1">
                  <Tag text={getEventStatus(event.startedAt, event.endedAt)} />
                  <span className="text-label2 max-w-full truncate rounded-[.4rem] bg-blue-100 px-[.6rem] py-[.4rem] text-blue-500">
                    {formatDate(event.startedAt)} ~ {formatDate(event.endedAt)}
                  </span>
                </div>
                <h2 className="text-subtitle mb-2 text-gray-black">{event.title}</h2>
                <p className="text-body line-clamp-2 overflow-hidden text-ellipsis break-words text-gray-400">
                  {event.content}
                </p>
              </li>
            </Link>
          ))}
        </ul>
        <Toaster />
      </Wrapper>
    </main>
  );
}

export default Event;

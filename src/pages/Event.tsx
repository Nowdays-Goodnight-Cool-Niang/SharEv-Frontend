import { Link } from "react-router";
import Tag from "../components/common/Tag";
import Wrapper from "../components/common/Wrapper";
import Header from "../components/event/Header";
import { useQueryEvents } from "../hooks/useQueryEvents";
import { IEvent } from "../types";
import { formatDate } from "../utils/date";
import { getEventStatus } from "../utils/event";

function Event() {
  const { events, isLoading, error } = useQueryEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;



  return (
    <main className="flex flex-col bg-gray-30 pb-10">
      <Header></Header>
      <Wrapper>
        <div className="flex justify-between items-center mt-7 mb-8">
          <h1 className="text-title text-gray-black text-left">
            참여 가능한 행사를
            <br />
            확인하세요
          </h1>
          <button disabled className="text-label text-gray-500 bg-gray-70 py-2 px-4 rounded-lg">
            행사 주최하기
          </button>
        </div>
        <ul className="flex flex-col gap-7">
          {events!.map((event) => (
           <Link to={`${event.id}`}>
            <li className="" key={event.id}>
              <div className="bg-slate-100 w-full h-36 rounded-xl mb-4 overflow-hidden  ">
                <img className="w-full img-cover" src={event.imageUrl} />
              </div>
              <div className="flex gap-1 mb-3">
                <Tag text={getEventStatus(event.startedAt, event.endedAt)}/>
                <span className="text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] bg-blue-100 text-blue-500">
                  {formatDate(event.startedAt)} ~ {formatDate(event.endedAt)}
                </span>
              </div>
              <h2 className="mb-2 text-subtitle text-gray-black">
                {event.title}
              </h2>
              <p className="text-body text-gray-400 line-clamp-2 text-ellipsis overflow-hidden break-words">
                {event.content}
              </p>
            </li>
           </Link>
          ))}
        </ul>
      </Wrapper>
    </main>
  );
}

export default Event;

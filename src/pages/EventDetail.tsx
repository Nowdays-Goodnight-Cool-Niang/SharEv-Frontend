import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ButtonPrimary from "../components/common/ButtonPrimary";
import ButtonSecondary from "../components/common/ButtonSecondary";
import Wrapper from "../components/common/Wrapper";
import Header from "../components/eventDetail/Header";
import Tab from "../components/eventDetail/Tab";
import { useQueryEvent } from "../hooks/useQueryEvent";
import { getEventStatus } from "../utils/event";
import OpenInNewSvg from "../assets/icons/ic_open_in_new.svg?react";

enum TabType {
  info = "info",
  people = "people",
}

function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, isLoading, error } = useQueryEvent(eventId!);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const updateSearchParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (!tab) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", TabType.info);
      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="bg-gray-30">
      <Header></Header>
      <Wrapper>
        <div className="flex flex-col pb-10">
          <div className="bg-slate-100 w-full h-52 rounded-xl mt-7 mb-5"></div>
          <div className="mb-2 flex">
            <div className="text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] bg-green-light text-green-dark ">
              {getEventStatus(event!.startedAt, event!.endedAt)}
            </div>
          </div>

          <h1 className="mb-6 text-title text-gray-black">{event?.title}</h1>
          <div className="mb-6 p-1 bg-gray-50 rounded-xl flex justify-between items-center gap-x-1">
            <Tab
              text="행사 정보"
              onClick={() => updateSearchParams("tab", TabType.info)}
              isActive={searchParams.get("tab") === TabType.info}
            />
            <Tab
              text="참여하는 사람들"
              onClick={() => updateSearchParams("tab", TabType.people)}
              isActive={searchParams.get("tab") === TabType.people}
            />
          </div>

          {searchParams.get("tab") === TabType.info && (
            <div>
              <ul className="gap-3 flex flex-col py-3 border-t border-b border-solid border-gray-70 mb-5">
                <li className="flex">
                  <h2 className="text-gray-300 text-label min-w-12">장소</h2>
                  <span className="text-label4 text-gray-500">
                    {event?.place}
                  </span>
                </li>
                <li className="flex">
                  <h2 className="text-gray-300 text-label min-w-12">주최자</h2>
                  <span className="text-label4 text-gray-500">
                    {event?.organizer}
                  </span>
                </li>
                <li className="flex">
                  <h2 className="text-gray-300 text-label min-w-12">일시</h2>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-x-2 ">
                      <div className="text-blue-500 font-bold text-[.8rem] bg-blue-100 p-1 rounded-[.4rem]">
                        시작일자
                      </div>
                      <span className="text-label4 text-gray-500">
                        {event?.startedAt.toString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2 ">
                      <div className="text-blue-500 font-bold text-[.8rem] bg-blue-100 p-1 rounded-[.4rem]">
                        종료일자
                      </div>
                      <span className="text-label4 text-gray-500">
                        {event?.endedAt.toString()}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <h2 className="text-gray-300 text-label mb-2">행사 소개</h2>
              <p className="text-body text-gray-500 mb-4">{event?.content}</p>
              <ButtonSecondary
                children={
                  <div className="flex justify-center items-center gap-2">
                    <span>자세한 정보 보러가기</span>
                    <OpenInNewSvg />
                  </div>
                }
              ></ButtonSecondary>
            </div>
          )}
          {searchParams.get("tab") === TabType.people && (
            <div>
              <ul className="gap-2 grid grid-cols-3">
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
              </ul>
            </div>
          )}
          <div className="fixed bottom-8 left-4 right-4 max-w-full">
            <ButtonPrimary
              children={<span>이 행사에 참여해요</span>}
              onClick={() => {}}
            ></ButtonPrimary>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

function PeopleCard() {
  return (
    <li className="flex flex-col py-5 items-center gap-2 bg-gray-50 border border-solid border-gray-70 rounded-xl ">
      <div className="w-24 h-24 rounded-full bg-gray-30"></div>
      <p className="tex-body-2 text-gray-300">캠퍼</p>
    </li>
  );
}

export default EventDetail;

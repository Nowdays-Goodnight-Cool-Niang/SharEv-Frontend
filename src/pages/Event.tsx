import Wrapper from "../components/common/Wrapper";
import Header from "../components/event/Header";

function Event() {
  const events = [
    {
      id: 1,
      name: "삐약톤 : 캠퍼스 대항전",
      startDate: "2023-10-01",
      endDate: "2024-10-23",
      image: "24423423424",
      text: "친구들과 함께 머리를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...",
    },
    {
      id: 1,
      name: "삐약톤 : 캠퍼스 대항전",
      startDate: "2023-10-01",
      endDate: "2024-10-23",
      image: "24423423424",
      text: "친구들과 함께 머리를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...",
    },
    { id: 2, name: "삐약톤 : 캠퍼스 대항전", date: "2023-10-15" },
    { id: 3, name: "Event 3", date: "2023-11-01" },
  ];

  return (
    <main className="flex flex-col bg-gray-30 pb-10">
      <Header></Header>
      <Wrapper>
        {" "}
        <div className="flex justify-between items-center mt-7 mb-8">
          <h1 className="text-title text-gray-black text-left">
            참여 가능한 행사를
            <br />
            확인하세요
          </h1>
          <button className="text-label text-gray-500 bg-gray-70 py-2 px-4 rounded-lg">
            행사 주최하기
          </button>
        </div>
        <ul className="flex flex-col gap-7">
          {events.map((event) => (
            <li className="" key={event.id}>
              <div className="bg-slate-100 w-full h-36 rounded-xl mb-4"></div>
              <div className="flex gap-1 mb-3">
                <span className="text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] bg-green-light text-green-dark">
                  진행 중
                </span>
                <span className="text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] bg-blue-100 text-blue-500">
                  {event.startDate}
                </span>
              </div>
              <h2 className="mb-2 text-subtitle text-gray-black">
                {event.name}
              </h2>
              <p className="text-body text-gray-400 line-clamp-2 text-ellipsis overflow-hidden break-words">
                {event.text}
              </p>
            </li>
          ))}
        </ul>
      </Wrapper>
    </main>
  );
}

export default Event;

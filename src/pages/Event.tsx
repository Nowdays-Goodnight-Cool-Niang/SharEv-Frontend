function Event() {
  const events = [
    {
      id: 1,
      name: "Event 1",
      startDate: "2023-10-01",
      endDate: "2024-10-23",
      image: "24423423424",
      text: "친구들과 함께 머리를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한 협업을 경험할 수 있는 오험할 수 있는 ...",
    },
    { id: 2, name: "Event 2", date: "2023-10-15" },
    { id: 3, name: "Event 3", date: "2023-11-01" },
  ];

  return (
    <main className="flex flex-col bg-slate-500">
      <header className="mb-7"></header>
      <div className="flex justify-between items-center mb-8">
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
            <div className="flex ">
              <span className="text-label2 p-[.6rem] rounded-[.4rem] bg-green-light text-green-dark">
                진행 중
              </span>
              <span className="text-label2 p-[.6rem] rounded-[.4rem] bg-blue-100 text-blue-500">
                {event.startDate}
              </span>
            </div>
            <h2> {event.name}</h2>
            <p>{event.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Event;

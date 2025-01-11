import ButtonPrimary from "../components/common/ButtonPrimary";
import ButtonSecondary from "../components/common/ButtonSecondary";
import Header from "../components/eventDetail/Header";

function EventDetail() {
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
      <div className="bg-slate-100 w-full h-52 rounded-xl mt-7 mb-5"></div>
      <span className="mb-2 text-label2 px-[.6rem] py-[.4rem] rounded-[.4rem] bg-green-light text-green-dark">
        진행 중
      </span>
      <h1 className="mb-6 text-title text-gray-black">
        삐약톤 : 캠퍼스 대항전
      </h1>
      <div className="mb-6 p-1 bg-gray-50 rounded-xl flex justify-between items-center gap-x-1">
        <button className="rounded-lg text-blue-500 text-label-3 py-3 w-full bg-white">
          행사 정보
        </button>
        <button className="rounded-lg text-gray-300 py-3 w-full">
          참여하는 사람들
        </button>
      </div>

      <ul className="gap-3 flex flex-col py-3 border-t border-b border-solid border-gray-70 mb-5">
        <li className="flex">
          <h2 className="text-gray-300 text-label min-w-12">장소</h2>
          <span className="text-label4 text-gray-500">
            동국대학교 서울캠퍼스 혜화관 고순청 세미나실
          </span>
        </li>
        <li className="flex">
          <h2 className="text-gray-300 text-label min-w-12">주최자</h2>
          <span className="text-label4 text-gray-500">GDG Campus Korea</span>
        </li>
        <li className="flex">
          <h2 className="text-gray-300 text-label min-w-12">일시</h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-x-2 ">
              <div className="text-blue-500 font-bold text-[.8rem] bg-blue-100 p-1 rounded-[.4rem]">
                시작일자
              </div>
              <span className="text-label4 text-gray-500">
                2025.01.11 (토) 오전 11:00
              </span>
            </div>
            <div className="flex items-center gap-x-2 ">
              <div className="text-blue-500 font-bold text-[.8rem] bg-blue-100 p-1 rounded-[.4rem]">
                시작일자
              </div>
              <span className="text-label4 text-gray-500">
                2025.01.11 (토) 오전 11:00
              </span>
            </div>
          </div>
        </li>
      </ul>
      <h2 className="text-gray-300 text-label mb-2">행사 소개</h2>
      <p className="text-body text-gray-500 mb-4">
        친구들과 함께 머리를 맞대고 밤새 새로운 아이디어를 구현하며, 유쾌한
        협업을 경험할 수 있는 오프라인 해커톤! GDG Campus Korea 에서 캠퍼스
        대항전 🐣삐약톤🐣을 주최합니다. 🎉 대학교의 이름을 걸고 여러분의
        반짝이는 아이디어와 열정을 마음껏 펼칠 수 있는 이 자리에 함께
        해주세요!함께 웃고 도전하며 성장할 수 있는 소중한 시간을 만들어드릴게요.
        여러분의 꿈과 열정을 응원하는 삐약톤에서 만나요! 😊
      </p>
      <ButtonSecondary
        children={
          <div className="flex justify-center items-center gap-2">
            <span>자세한 정보 보러가기</span>
            <div>아이콘</div>
          </div>
        }
      ></ButtonSecondary>
      <div className="fixed bottom-8 left-4 right-4 max-w-full">
        <ButtonPrimary
          children={<span>이 행사에 참여해요</span>}
          onClick={() => {}}
        ></ButtonPrimary>
      </div>
    </main>
  );
}

export default EventDetail;

import { useEffect, useState } from "react";
import ButtonPrimary from "../components/common/ButtonPrimary";
import Wrapper from "../components/common/Wrapper";

function Profile() {
  return (
    <div className="relative">
      <FlyingCircles />

      <div className="absolute top-0">
        <Wrapper>
          <main>
            <h1 className="text-title text-gray-100">
              <span className="text-gray-30">삐약톤 : 캠퍼스 대항전</span>에서
              사용할
              <br /> 프로필을 완성하세요
            </h1>
            <div className="flex flex-col items-center px-5 pt-10 pb-5 rounded-3xl border border-solid border-white">
              <div>프로필</div>
              <h1 className="text-title text-gray-black mb-2">권나연</h1>
              <div className="text-label text-gray-black py-[.6rem] px-2 mb-3 bg-gray-30 border border-solid border-gray-black rounded-[.4rem]">
                010-1234-1234
              </div>
              <ul className="mb-10">
                <button>페이스북</button>
                <button>페이스북</button>
                <button>페이스북</button>
              </ul>
              <div className="rounded-xl border border-solid border-gray-70 bg-white p-5 w-full"></div>
            </div>
            <div className="fixed bottom-8 left-4 right-4 max-w-full">
              <ButtonPrimary
                children={<span>프로필을 완성했어요</span>}
                onClick={() => {}}
                variant="success"
              ></ButtonPrimary>
            </div>
          </main>
        </Wrapper>
      </div>
    </div>
  );
}

function FlyingCircles() {
  const [circles, setCircles] = useState<
    { id: number; size: number; opacity: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generateCircles = () => {
      const newCircles = Array.from({ length: 50 }, (_, index) => ({
        id: index,
        size: Math.floor(Math.random() * 5) + 2,
        opacity: Math.random(),
        delay: Math.random() * 5,
      }));
      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`absolute bg-white rounded-full animate-fly left-[-4rem]`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
            animationDelay: `${circle.delay}s`,
            top: `${Math.random() * 100}%`, // Random vertical position
          }}
        ></div>
      ))}
    </div>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import ButtonPrimary from "../components/common/ButtonPrimary";
import Wrapper from "../components/common/Wrapper";
import AvatarImg from "../assets/images/avatars/1.png";
import GithubSvg from "../assets/icons/ic_github.svg?react";
import FacebookSvg from "../assets/icons/ic_facebook.svg?react";
import InstagramSvg from "../assets/icons/ic_instagram.svg?react";
import SNS from "../components/profile/SNS";

function Profile() {
  return (
    <div className="relative">
      <FlyingCircles />

      <div className="absolute top-0 w-full h-screen">
        <Wrapper>
          <main className="w-full h-full flex flex-col">
            <h1 className="text-title text-gray-100 mt-[7.2rem] mb-12">
              <span className="text-gray-30">삐약톤 : 캠퍼스 대항전</span>에서
              사용할
              <br /> 프로필을 완성하세요
            </h1>
            <div className="bg-[url('/profile_background.png')] bg-cover w-full rounded-3xl border border-solid border-white overflow-hidden">
              <div className="w-full flex flex-col items-center px-5 pt-10 pb-5 ">
                <img
                  className="mb-3 w-28 h-28 object-cover border border-solid border-gray-500 rounded-full overflow-hidden"
                  src={AvatarImg}
                  alt="AvatarImg"
                />

                <h1 className="text-title text-gray-black mb-2">권나연</h1>
                <div className="text-label text-gray-black py-[.6rem] px-2 mb-3 bg-gray-30 border border-solid border-gray-black rounded-[.4rem]">
                  010-1234-1234
                </div>
                <ul className="mb-10 gap-2 flex">
                  <SNS onClick={() => console.log("?")}>
                    <GithubSvg />
                  </SNS>
                  <SNS onClick={() => console.log("?")}>
                    <FacebookSvg />
                  </SNS>
                  <SNS onClick={() => console.log("?")}>
                    <InstagramSvg />
                  </SNS>
                </ul>
                <div className="flex flex-wrap items-center gap-1 rounded-xl border border-solid border-gray-70 bg-white p-5 w-full">
                  <input
                    type="text"
                    placeholder="팀이름"
                    className="text-body2 px-2 py-[.6rem] rounded-[.4rem] placeholder:text-gray-100 text-gray-500 bg-gray-30 border border-solid border-gray-100"
                  />
                  <span className="text-body2 text-gray-500">팀에서</span>
                  <input
                    type="text"
                    placeholder="직군"
                    className="text-body2 px-2 py-[.6rem] rounded-[.4rem] placeholder:text-gray-100 text-gray-500 bg-gray-30 border border-solid border-gray-100"
                  />
                  <span className="text-body2 text-gray-500">
                    을 맡고 있습니다
                  </span>
                  <span className="text-body2 text-gray-500">
                    이번 해커톤에서
                  </span>
                  <input
                    type="text"
                    placeholder="프로젝트 한 줄 소개"
                    className="text-body2 px-2 py-[.6rem] rounded-[.4rem] placeholder:text-gray-100 text-gray-500 bg-gray-30 border border-solid border-gray-100"
                  />
                  <span className="text-body2 text-gray-500">
                    를 만들었습니다
                  </span>
                </div>
              </div>
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

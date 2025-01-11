
import ButtonPrimary from "../components/common/ButtonPrimary";
import Wrapper from "../components/common/Wrapper";
import toast from "react-hot-toast";
import FlyingCircles from "../components/profile/FlyingCircles";
import ProfileCard from "../components/common/ProfileCard";

function Profile() {
    const notify = () => toast('Here is your toast.');
    
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
            
            <ProfileCard/>
            <div className="fixed bottom-8 left-4 right-4 max-w-full">
              <ButtonPrimary
                children={<span>프로필을 완성했어요</span>}
                onClick={notify}
                variant="success"
              ></ButtonPrimary>
            </div>
          </main>
        </Wrapper>
      </div>
    </div>
  );
}

export default Profile;
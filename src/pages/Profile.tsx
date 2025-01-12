import ButtonPrimary from "../components/common/ButtonPrimary";
import Wrapper from "../components/common/Wrapper";
import FlyingCircles from "../components/profile/FlyingCircles";
import ProfileCard from "../components/common/ProfileCard";
import { useQueryAccount } from "../hooks/useQueryAccount";
import { useQueryEventProfile } from "../hooks/useQueryEventProfile"; // Added import
import { IEventProfile } from "../types";
import { useParams } from "react-router";
import { useState } from "react";

function Profile() {
  const { eventId } = useParams<{ eventId: string }>();
  const { account, isLoading, error } = useQueryAccount();
  const [eventProfileData, setEventProfileData] = useState<IEventProfile>({
    eventId: eventId!, 
    jobGroup: "", 
    teamName: "", 
    projectInfo: "",
  });



  const { createEventProfile } = useQueryEventProfile();

  const handleInputChange = (key: keyof IEventProfile, value: string) => {
    setEventProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isLoading) return <div>데이터를 받아오고 있습니다...</div>;
  if (error) return <div>에러가 발생했어요: {error.message}</div>;

  const handleSaveProfile = () => {
    createEventProfile(eventProfileData);
  };

  console.log(eventProfileData)

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

            <ProfileCard
              id={account!.id}
              name={account!.name}
              phone={account?.phone}
              profileImageId={account!.profileImageId}
              github={account?.github}
              instagram={account?.instagram}
              facebook={account?.facebook}
              jobGroup={eventProfileData.jobGroup}
              teamName={eventProfileData.teamName}
              projectInfo={eventProfileData.projectInfo}
              onInputChange={handleInputChange}
            />
            <div className="fixed bottom-8 left-4 right-4 max-w-full">
              <ButtonPrimary
                onClick={handleSaveProfile}
                variant="success"
              >
                <span>프로필을 완성했어요</span>
              </ButtonPrimary>
            </div>
          </main>
        </Wrapper>
      </div>
    </div>
  );
}

export default Profile;

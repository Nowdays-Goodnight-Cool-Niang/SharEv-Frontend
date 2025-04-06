import GithubSvg from '../../assets/icons/ic_github.svg?react';
import FacebookSvg from '../../assets/icons/ic_facebook.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';
import SNS from '../profile/SNS';
import ProfileText from '../profile/ProfileText';
import ProfileInput from '../profile/ProfileInput';
import { IShareCard } from '../../types';

interface ProfileCardProps {
  id: number;
  name: string;
  phone?: string;
  profileImageId: number;
  github?: string;
  instagram?: string;
  facebook?: string;
  position: string;
  teamName: string;
  introductionText: string;
  onInputChange: (key: keyof IShareCard, value: string) => void;
}
// TODO: IShareCard 타입으로 수정하였는데, 프로퍼티명 수정하신 것 같아 맞추어 변경하였으니 확인부탁드립니당

function ProfileCard({
  name,
  phone,
  profileImageId,
  github,
  instagram,
  facebook,
  position,
  teamName,
  introductionText,
  onInputChange,
}: ProfileCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-solid border-white bg-[url('/profile_background.png')] bg-cover">
      <div className="flex w-full flex-col items-center px-5 pb-5 pt-10">
        <img
          className="mb-3 h-28 w-28 overflow-hidden rounded-full border border-solid border-gray-500 object-cover"
          src={`../../assets/images/avatars/${profileImageId}.png`}
          alt="AvatarImg"
        />

        <h1 className="text-title text-gray-black mb-2">{name}</h1>
        <div className="text-label border-gray-black bg-gray-30 text-gray-black mb-3 rounded-[.4rem] border border-solid px-2 py-[.6rem]">
          {phone || '전화번호를 작성하지 않았어요'}
        </div>
        <ul className="flex gap-2">
          {github && (
            <SNS onClick={() => window.open(github, '_blank')}>
              <GithubSvg />
            </SNS>
          )}
          {facebook && (
            <SNS onClick={() => window.open(facebook, '_blank')}>
              <FacebookSvg />
            </SNS>
          )}
          {instagram && (
            <SNS onClick={() => window.open(instagram, '_blank')}>
              <InstagramSvg />
            </SNS>
          )}
        </ul>
        <div className="border-gray-70 mt-10 flex w-full flex-wrap items-center gap-1 rounded-xl border border-solid bg-white p-5">
          <ProfileInput
            placeholder={'팀 이름'}
            value={teamName}
            onChange={(e) => onInputChange('teamName', e.target.value)}
          />
          <ProfileText>팀에서</ProfileText>
          <ProfileInput
            placeholder={'직군'}
            value={position}
            onChange={(e) => onInputChange('position', e.target.value)}
          />
          <ProfileText>을 맡고 있습니다</ProfileText>
          <ProfileText>이번 해커톤에서</ProfileText>
          <ProfileInput
            placeholder={'프로젝트 한 줄 소개'}
            value={introductionText}
            onChange={(e) => onInputChange('introductionText', e.target.value)}
          />
          <ProfileText>를 만들었습니다</ProfileText>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

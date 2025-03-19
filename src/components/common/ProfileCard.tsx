import GithubSvg from '../../assets/icons/ic_github.svg?react';
import FacebookSvg from '../../assets/icons/ic_facebook.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';
import SNS from '../profile/SNS';
import ProfileText from '../profile/ProfileText';
import ProfileInput from '../profile/ProfileInput';
import { IEventProfile } from '../../types';

interface ProfileCardProps {
  id: number;
  name: string;
  phone?: string;
  profileImageId: number;
  github?: string;
  instagram?: string;
  facebook?: string;
  jobGroup: string;
  teamName: string;
  projectInfo: string;
  onInputChange: (key: keyof IEventProfile, value: string) => void;
}

function ProfileCard({
  name,
  phone,
  profileImageId,
  github,
  instagram,
  facebook,
  jobGroup,
  teamName,
  projectInfo,
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

        <h1 className="text-title mb-2 text-gray-black">{name}</h1>
        <div className="text-label mb-3 rounded-[.4rem] border border-solid border-gray-black bg-gray-30 px-2 py-[.6rem] text-gray-black">
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
        <div className="mt-10 flex w-full flex-wrap items-center gap-1 rounded-xl border border-solid border-gray-70 bg-white p-5">
          <ProfileInput
            placeholder={'팀 이름'}
            value={teamName}
            onChange={(e) => onInputChange('teamName', e.target.value)}
          />
          <ProfileText>팀에서</ProfileText>
          <ProfileInput
            placeholder={'직군'}
            value={jobGroup}
            onChange={(e) => onInputChange('jobGroup', e.target.value)}
          />
          <ProfileText>을 맡고 있습니다</ProfileText>
          <ProfileText>이번 해커톤에서</ProfileText>
          <ProfileInput
            placeholder={'프로젝트 한 줄 소개'}
            value={projectInfo}
            onChange={(e) => onInputChange('projectInfo', e.target.value)}
          />
          <ProfileText>를 만들었습니다</ProfileText>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

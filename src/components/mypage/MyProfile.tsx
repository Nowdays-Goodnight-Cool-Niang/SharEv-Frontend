import { useNavigate } from 'react-router';
import BaseButton from '../common/BaseButton';
import GtihubSvg from '../../assets/icons/ic_github.svg?react';
import LinkedInSvg from '../../assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';

function MyProfile() {
  const navigate = useNavigate();

  const profileData = {
    name: '권나연',
    email: 'example@ex.com',
    linkedInUrl: 'linkedin.com/in/ooo',
    githubUrl: 'github.com/ooo',
    instagramUrl: 'instagram.com/ooo',
  };

  const moveProfileEdit = () => navigate('/profile-edit');

  return (
    <article className="mt-6 flex justify-between rounded bg-gray-800 p-5 pb-6">
      <div>
        <h3 className="text-body-1 text-gray-200">{profileData.name}</h3>
        <span className="text-body-4 text-gray-400">{profileData.email}</span>
        <ul className="flex gap-1.5">
          {profileData.linkedInUrl && (
            <li className="flex h-4 w-4 items-center justify-center rounded bg-gray-700">
              <LinkedInSvg />
            </li>
          )}
          {profileData.githubUrl && (
            <li className="flex h-4 w-4 items-center justify-center rounded bg-gray-700">
              <GtihubSvg />
            </li>
          )}
          {profileData.instagramUrl && (
            <li className="flex h-4 w-4 items-center justify-center rounded bg-gray-700">
              <InstagramSvg />
            </li>
          )}
        </ul>
      </div>
      <div className="w-20">
        <BaseButton onClick={moveProfileEdit}>프로필 수정</BaseButton>
      </div>
    </article>
  );
}

export default MyProfile;

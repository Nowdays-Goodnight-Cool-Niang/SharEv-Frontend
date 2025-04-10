import { useNavigate } from 'react-router';
import BaseButton from '../common/BaseButton';
import SnsIcon from '../common/SnsIcon';
import GtihubSvg from '../../assets/icons/ic_github.svg?react';
import LinkedinSvg from '../../assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';
import { useQueryAccount } from '../../hooks/useQueryAccount';

function MyProfile() {
  const navigate = useNavigate();
  const { profile } = useQueryAccount();

  const moveProfileEdit = () => navigate('/profile-edit');

  return (
    <article className="mt-6 flex justify-between rounded bg-gray-800 p-5 pb-6">
      <div>
        <div>
          <h3 className="text-body-1 text-gray-200">{profile?.name}</h3>
          <span className="text-body-4 text-gray-400">{profile?.email}</span>
        </div>
        <ul className="mt-3 flex gap-1.5">
          <SnsIcon size="small" hasUrl={!!profile?.linkedinUrl}>
            <LinkedinSvg />
          </SnsIcon>
          <SnsIcon size="small" hasUrl={!!profile?.githubUrl}>
            <GtihubSvg />
          </SnsIcon>
          <SnsIcon size="small" hasUrl={!!profile?.instagramUrl}>
            <InstagramSvg />
          </SnsIcon>
        </ul>
      </div>
      <div className="w-20">
        <BaseButton size="small" onClick={moveProfileEdit}>
          프로필 수정
        </BaseButton>
      </div>
    </article>
  );
}

export default MyProfile;

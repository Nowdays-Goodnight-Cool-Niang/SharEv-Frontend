import { useNavigate } from 'react-router';
import BaseButton from '@/components/common/BaseButton';
import SnsIcon from '@/components/common/SnsIcon';
import GtihubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedinSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';
import { useQueryAccount } from '@/hooks/useQueryAccount';

function MyProfile() {
  const navigate = useNavigate();
  const { profile } = useQueryAccount();

  const moveProfileEdit = () => navigate('/profile-edit');

  return (
    <article className="">
      <div className="mb-6">
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-5 tracking-tight text-gray-800">
            {profile?.name}
          </h3>
          <span className="text-sm leading-5 tracking-tight text-gray-500">{profile?.email}</span>
        </div>
        <ul className="flex gap-2">
          <SnsIcon size="small" hasUrl={!!profile?.socialLinks.linkedinUrl}>
            <LinkedinSvg width={20} height={20} />
          </SnsIcon>
          <SnsIcon size="small" hasUrl={!!profile?.socialLinks.githubUrl}>
            <GtihubSvg width={20} height={20} />
          </SnsIcon>
          <SnsIcon size="small" hasUrl={!!profile?.socialLinks.instagramUrl}>
            <InstagramSvg width={20} height={20} />
          </SnsIcon>
        </ul>
      </div>
      <BaseButton onClick={moveProfileEdit}>프로필 수정</BaseButton>
    </article>
  );
}

export default MyProfile;

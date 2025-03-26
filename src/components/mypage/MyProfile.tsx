import { useNavigate } from 'react-router';
import BaseButton from '../common/BaseButton';

function MyProfile() {
  const navigate = useNavigate();

  const profileData = {
    name: '권나연',
    email: 'example@ex.com',
    linkedIn: 'linkedin.com/in/ooo',
    github: 'github.com/ooo',
    instagram: 'instagram.com/ooo',
  };

  const moveProfileEdit = () => navigate('/profile-edit');

  return (
    <article className="mt-6 flex rounded bg-gray-800 p-5 pb-6">
      <div>
        <h3 className="text-body-1 text-gray-200">{profileData.name}</h3>
        <span className="text-body-4 text-gray-400">{profileData.email}</span>
      </div>
      <BaseButton onClick={moveProfileEdit}>프로필 수정</BaseButton>
    </article>
  );
}

export default MyProfile;

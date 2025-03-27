import ButtonPrimary from '../common/BaseButton';
import ShareCard from './ShareCard';

function ProfileSection() {
  return (
    <div className="wrapper mt-11">
      <ShareCard />
      <div className="h-8"></div>
      <ButtonPrimary onClick={() => {}}>프로필 저장</ButtonPrimary>
    </div>
  );
}

export default ProfileSection;

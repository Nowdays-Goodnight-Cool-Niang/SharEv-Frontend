import FormHeader from '@/components/profile/FormHeader';
import NoticeInfo from '@/components/common/NoticeInfo';
import FormContent from '@/components/profile/FormContent';

function ProfileSetup() {
  console.log('도착');
  return (
    <main className="background wrapper min-h-screen bg-white pb-6 pt-4">
      <FormHeader content="프로필을 완성하세요" />
      <div className="mt-4">
        <NoticeInfo>모든 정보는 다른 사람에게 공개돼요</NoticeInfo>
      </div>
      <FormContent variant={'setup'} />
    </main>
  );
}

export default ProfileSetup;

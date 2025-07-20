import FormHeader from '@/components/profile/FormHeader';
import NoticeInfo from '@/components/common/NoticeInfo';
import FormContent from '@/components/profile/FormContent';

function ProfileSetup() {
  return (
    <div className="background flex flex-col bg-white">
      <div className="wrapper pb-6">
        <FormHeader content="프로필을 완성하세요" />
        <div className="mt-4">
          <NoticeInfo>모든 정보는 다른 사람에게 공개돼요</NoticeInfo>
          {/* CHECK - 문구 변경: 작성하신 정보는 연결된 멤버들과 공유되니 정확히 입력해주세요 */}
        </div>
        <FormContent variant={'setup'} />
      </div>
    </div>
  );
}

export default ProfileSetup;

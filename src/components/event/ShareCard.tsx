import ShareCardLabel from './ShareCardLabel';
import ShareCardInput from './ShareCardInput';
import { useShareCardDetailStore } from '../../stores/useShareCardDetailStore';
import { useProfileStore } from '../../stores/useProfileStore';
import SocialIcons from './SocialIcons';
import { QRBox } from './QRBox';
import EditButton from './EditButton';

function ShareCard() {
  const profile = useProfileStore((state) => state.profile);
  const shareCardDetail = useShareCardDetailStore((state) => state.shareCardDetail);
  const editMode = useShareCardDetailStore((state) => state.editMode);
  const setEditMode = useShareCardDetailStore((state) => state.setEditMode);

  return (
    <div>
      <div className="relative overflow-hidden rounded-[4px] rounded-b-xl bg-orange-500 pb-5 pt-16">
        <img
          src="src/assets/images/img_share_card_graphic.png"
          className="absolute w-full -translate-y-1/3 transform"
        />
        <div className="relative z-10 mx-5 flex flex-col items-center rounded-[4px] bg-gray-900 px-3 py-10">
          <h1 className="font-ydestreet mb-5 text-3xl text-gray-50">{profile?.name}</h1>
          <QRBox
            url="http"
            isAvailable={
              shareCardDetail?.teamName !== null &&
              shareCardDetail?.introductionText !== null &&
              shareCardDetail?.position !== null
            }
          />
          <p className="text-body-2 mb-4 mt-6 text-gray-400">{profile?.email}</p>
          <SocialIcons
            linkedinUrl={profile?.linkedinUrl}
            githubUrl={profile?.githubUrl}
            instagramUrl={profile?.instagramUrl}
          />
        </div>
      </div>

      <div className="rounded-[4px] rounded-t-xl bg-gray-900 p-5 pb-7">
        <ShareCardLabel>
          이번 해커톤에서
          <ShareCardInput
            field={'teamName'}
            initialValue={shareCardDetail?.teamName || ''}
            placeholder="팀이름"
          />
          팀에서
          <ShareCardInput
            field={'position'}
            initialValue={shareCardDetail?.position || ''}
            placeholder="직군"
          />
          역할을 맡아
          <ShareCardInput
            field={'introductionText'}
            initialValue={shareCardDetail?.introductionText || ''}
            placeholder="프로젝트 한 줄 소개"
          />
          를 만들었어요.
        </ShareCardLabel>

        {!editMode && (
          <div className="mt-3 flex justify-end">
            <EditButton onClick={() => setEditMode(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareCard;

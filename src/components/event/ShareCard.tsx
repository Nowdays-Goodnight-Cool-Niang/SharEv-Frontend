import backgroundGraphic from '@/assets/images/img_share_card_graphic.png';
import { IProfile, IShareCardDetailsByEvent } from '@/types';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import EditButton from '@/components/event/EditButton';
import { QRBox } from '@/components/event/QRBox';
import ShareCardInput from '@/components/event/ShareCardInput';
import ShareCardLabel from '@/components/event/ShareCardLabel';
import SocialIcons from '@/components/event/SocialIcons';
import { forwardRef } from 'react';

export type ShareCardMode = 'edit' | 'view';
export type ShareCardSize = 'default' | 'small';

interface ShareCardProps {
  profile?: IProfile;
  detail?: IShareCardDetailsByEvent;
  mode?: ShareCardMode;
  size?: ShareCardSize;
  isReveal?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  isQRClicked?: () => void;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard(
  {
    profile,
    detail,
    size,
    mode = 'view',
    isReveal = false,
    isQRClicked,
    isOpen = false,
    onToggle,
  }: ShareCardProps,
  ref
) {
  return (
    <div
      ref={ref}
      className={`w-[340px] ${size == 'small' ? 'scale-50' : ''} group relative flex aspect-[8/5] justify-center justify-self-center perspective-1000`}
    >
      <div
        className={`h-full ${isOpen ? 'translate-y-[106.25px]' : 'translate-y-0'} relative w-full transition-transform duration-700 transform-style-3d`}
      >
        <CardTop
          onClick={onToggle}
          isQRClicked={isQRClicked}
          profile={profile}
          isReveal={isReveal}
          isOpen={isOpen}
          mode={mode}
        />
        <CardDivider />
        {isReveal && <CardBottom onClick={onToggle} detail={detail} mode={mode} />}
      </div>
    </div>
  );
});

export default ShareCard;

function CardTop({
  onClick,
  isQRClicked,
  isReveal,
  isOpen,
  profile,
  mode,
}: {
  onClick?: () => void;
  isQRClicked?: () => void;
  isReveal?: boolean;
  isOpen?: boolean;
  mode?: ShareCardMode;
  profile?: IProfile;
}) {
  return (
    <div
      onClick={onClick}
      className={`transform-style-3d -translate-y-[212.5px] translate-z-[1px] ${!isOpen && '-rotate-x-180'} relative aspect-[8/5] w-full origin-bottom transition-transform duration-700`}
    >
      <CardTopInSide isQRClicked={isQRClicked} profile={profile} mode={mode} />
      <CardTopOutSide profile={profile} isReveal={isReveal} />
    </div>
  );
}

interface CardTopInsideProps {
  isQRClicked?: () => void;
  profile?: IProfile;
  mode?: ShareCardMode;
}
function CardTopInSide({ profile, mode, isQRClicked }: CardTopInsideProps) {
  const isEditable = mode === 'edit';
  const { editMode, isShareCardDetailBlank } = useShareCardDetailStore();
  const handleQRClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isQRClicked) isQRClicked();
  };

  return (
    <div
      className={`absolute inset-0 h-full w-full overflow-hidden rounded-b-2xl bg-white p-6 translate-z-[1px] backface-hidden`}
    >
      <img
        src={backgroundGraphic}
        className="pointer-events-none absolute inset-0 w-full select-none opacity-10 mix-blend-multiply -translate-y-10 transform"
      />
      {isEditable && (
        <div
          onClick={handleQRClicked}
          className="pointer-events-auto absolute right-6 top-6 h-24 w-24"
        >
          <QRBox url={profile?.id} isAvailable={!editMode && !isShareCardDetailBlank()} />
        </div>
      )}

      <div className="flex h-full flex-col justify-between">
        <SocialIcons
          linkedinUrl={profile?.linkedinUrl}
          githubUrl={profile?.githubUrl}
          instagramUrl={profile?.instagramUrl}
        />
        <div className={`z-10 origin-bottom-left transform`}>
          <h1 className="font-gmarket mb-3 text-3xl font-medium text-gray-900">{profile?.name}</h1>
          <p className="text-body-3 font-gmarket mb-2 text-gray-700">{profile?.email}</p>
          <p className="font-gmarket text-body-3 text-gray-700">삐약톤 캠퍼스 대항전</p>
        </div>
      </div>
    </div>
  );
}

interface CardTopOutSideeProps {
  profile?: IProfile;
  isReveal?: boolean;
}
function CardTopOutSide({ profile, isReveal }: CardTopOutSideeProps) {
  return (
    <div
      className={`${!isReveal && 'grayscale'} absolute flex h-full w-full flex-col justify-end overflow-hidden rounded-t-2xl bg-orange-700 p-6 rotate-y-180 rotate-z-180 backface-hidden`}
    >
      <img
        src={backgroundGraphic}
        className="pointer-events-none absolute inset-0 w-full select-none mix-blend-multiply -translate-y-10 transform"
      />
      <div className={`z-10 origin-bottom-left transform`}>
        <h1 className="font-gmarket mb-3 text-3xl font-medium text-gray-50">{profile?.name}</h1>
        <p className="text-body-3 font-gmarket text-gray-100">삐약톤 캠퍼스 대항전</p>
      </div>
    </div>
  );
}

function CardBottom({
  onClick,
  detail,
  mode,
}: {
  onClick?: () => void;
  detail?: IShareCardDetailsByEvent;
  mode: ShareCardMode;
}) {
  return (
    <div
      onClick={onClick}
      className="relative aspect-[8/5] w-full transform-style-3d -translate-y-[212.5px]"
    >
      <CardBottomInSide detail={detail} mode={mode} />
      <CardBottomOutSide />
    </div>
  );
}
function CardBottomInSide({
  detail,
  mode,
}: {
  detail?: IShareCardDetailsByEvent;
  mode: ShareCardMode;
}) {
  const { shareCardDetail, editMode, setEditMode, setShareCardDetailByKey } =
    useShareCardDetailStore();

  const isEditable = mode === 'edit';

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col justify-between gap-2 rounded-t-2xl bg-white p-6 scale-[99.5%] backface-hidden">
      <div className="scroll-hide h-full w-full overflow-y-scroll">
        <ShareCardLabel>
          저의 가장 인상 깊었던 경험은
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.teamName || ''}
              onChange={(val) => setShareCardDetailByKey('teamName', val)}
              placeholder="팀이름"
            />
          ) : (
            <span className="mx-1 text-xs text-gray-800">{detail?.teamName}</span>
          )}
          팀에서
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.position || ''}
              onChange={(val) => setShareCardDetailByKey('position', val)}
              placeholder="직군"
            />
          ) : (
            <span className="mx-1 text-xs text-gray-800">{detail?.position}</span>
          )}
          역할을 맡아
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.introductionText || ''}
              onChange={(val) => setShareCardDetailByKey('introductionText', val)}
              placeholder="프로젝트 한 줄 소개"
            />
          ) : (
            <span className="mx-1 text-xs text-gray-800">{detail?.introductionText}</span>
          )}
          를 만들었어요.
        </ShareCardLabel>
      </div>
      {isEditable && !editMode && (
        <div className="flex justify-end">
          <EditButton onClick={() => setEditMode(true)} />
        </div>
      )}
    </div>
  );
}
function CardBottomOutSide() {
  return (
    <div className="absolute flex h-full w-full rounded-t-2xl bg-orange-700 p-6 -rotate-z-180 rotate-y-180 backface-hidden"></div>
  );
}

function CardDivider() {
  return <hr className="mx-4 border-dashed border-gray-600 -translate-y-[212.5px]" />;
}

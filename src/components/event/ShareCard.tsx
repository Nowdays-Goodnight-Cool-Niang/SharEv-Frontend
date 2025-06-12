import backgroundGraphic from '@/assets/images/img_share_card_graphic.png';
import { IProfile, IShareCardDetailsByEvent } from '@/types';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import EditButton from '@/components/event/EditButton';
import { QRBox } from '@/components/event/QRBox';
import ShareCardInput from '@/components/event/ShareCardInput';
import ShareCardLabel from '@/components/event/ShareCardLabel';
import SocialIcons from '@/components/event/SocialIcons';

export type ShareCardMode = 'edit' | 'view';
export type ShareCardSize = 'default' | 'small';

interface ShareCardProps {
  profile?: IProfile;
  detail?: IShareCardDetailsByEvent;
  mode?: ShareCardMode;
  size?: ShareCardSize;
  isReveal?: boolean;
  isTop?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  isQRClicked?: () => void;
}

export default function ShareCard({
  profile,
  detail,
  mode = 'view',
  size = 'default',
  isReveal = false,
  isTop = false,
  isQRClicked,
  isOpen = false,
  onToggle,
}: ShareCardProps) {
  return (
    <div className="align-self-center group relative flex h-16 w-[340px] justify-center justify-self-center overflow-visible perspective-1000">
      <div
        onClick={onToggle}
        className={`${size == 'small' && (isOpen ? 'scale-75' : 'scale-50')} ${!isOpen && '-translate-y-32'} ${isTop && !isOpen && 'group-hover:-rotate-y-12 group-hover:rotate-x-12'} relative w-full max-w-[340px] transition-transform duration-700 transform-style-3d`}
      >
        <CardTop
          isQRClicked={isQRClicked}
          profile={profile}
          isReveal={isReveal}
          isOpen={isOpen}
          mode={mode}
        />
        <CardDivider />
        {isReveal && <CardBottom detail={detail} mode={mode} />}
      </div>
    </div>
  );
}

function CardTop({
  isQRClicked,
  isReveal,
  isOpen,
  profile,
  mode,
  isTop,
}: {
  isQRClicked?: () => void;
  isReveal?: boolean;
  isOpen?: boolean;
  mode?: ShareCardMode;
  profile?: IProfile;
  isTop?: boolean;
}) {
  return (
    <div
      className={`transform-style-3d translate-z-[1px] ${!isOpen && '-rotate-x-180'} ${!isOpen && !isReveal && isTop && 'group-hover:-rotate-x-90'} relative aspect-[8/5] w-full origin-bottom transition-transform duration-700`}
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
        className="absolute inset-0 w-full transform -translate-y-10 pointer-events-none select-none opacity-10 mix-blend-multiply"
      />
      {isEditable && (
        <div
          onClick={handleQRClicked}
          className="absolute w-24 h-24 pointer-events-auto right-6 top-6"
        >
          <QRBox url={profile?.id} isAvailable={!editMode && !isShareCardDetailBlank()} />
        </div>
      )}

      <div className="flex flex-col justify-between h-full">
        <SocialIcons
          linkedinUrl={profile?.linkedinUrl}
          githubUrl={profile?.githubUrl}
          instagramUrl={profile?.instagramUrl}
        />
        <div className={`z-10 origin-bottom-left transform`}>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">{profile?.name}</h1>
          <p className="mb-2 text-gray-700 text-body-3">{profile?.email}</p>
          <p className="text-gray-700 text-body-3">삐약톤 캠퍼스 대항전</p>
        </div>
      </div>
    </div>
  );
}

interface CardTopOutSideeProps {
  profile?: IProfile;
  isReveal?: boolean;
  size?: ShareCardSize;
}
function CardTopOutSide({ size, profile, isReveal }: CardTopOutSideeProps) {
  const isSmall = size == 'small';
  return (
    <div
      className={`${!isReveal && 'grayscale'} absolute flex h-full w-full flex-col justify-end overflow-hidden rounded-t-2xl bg-orange-700 p-6 rotate-y-180 rotate-z-180 backface-hidden`}
    >
      <img
        src={backgroundGraphic}
        className="absolute inset-0 w-full transform -translate-y-10 pointer-events-none select-none mix-blend-multiply"
      />
      <div className={`${isSmall && 'scale-75'} z-10 origin-bottom-left transform`}>
        <h1 className="mb-3 text-3xl font-bold text-gray-50">{profile?.name}</h1>
        <p className="text-gray-100 text-body-3">삐약톤 캠퍼스 대항전</p>
      </div>
    </div>
  );
}

function CardBottom({ detail, mode }: { detail?: IShareCardDetailsByEvent; mode: ShareCardMode }) {
  return (
    <div className="relative aspect-[8/5] w-full transform-style-3d">
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
      <div className="w-full h-full overflow-y-scroll scroll-hide">
        <ShareCardLabel>
          이번 해커톤에서
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.teamName || ''}
              onChange={(val) => setShareCardDetailByKey('teamName', val)}
              placeholder="팀이름"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-800">
              {detail?.teamName}
            </span>
          )}
          팀에서
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.position || ''}
              onChange={(val) => setShareCardDetailByKey('position', val)}
              placeholder="직군"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-800">
              {detail?.position}
            </span>
          )}
          역할을 맡아
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.introductionText || ''}
              onChange={(val) => setShareCardDetailByKey('introductionText', val)}
              placeholder="프로젝트 한 줄 소개"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-800">
              {detail?.introductionText}
            </span>
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
    <div className="absolute flex w-full h-full p-6 bg-orange-700 rounded-t-2xl -rotate-z-180 rotate-y-180 backface-hidden"></div>
  );
}

function CardDivider() {
  return <hr className="mx-4 border-gray-600 border-dashed" />;
}

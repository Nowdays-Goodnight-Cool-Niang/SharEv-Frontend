import { QRCodeSVG } from 'qrcode.react';
import ShareCardLabel from './ShareCardLabel';
// import ShareCardInput from './ShareCardInput';
import GtihubSvg from '../../assets/icons/ic_github.svg?react';
import LinkedInSvg from '../../assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '../../assets/icons/ic_instagram.svg?react';
import EditSvg from '../../assets/icons/ic_edit.svg?react';
import { useEffect, useState } from 'react';
import { useQueryShareCard } from '../../hooks/useQueryShareCard';

function ShareCard() {
  const { participantInfo, isLoading, error } = useQueryShareCard('participantId');
  const [teamName, setTeamName] = useState('');
  const [position, setPosition] = useState('');
  const [introductionText, setIntroductionText] = useState('');

  console.log(teamName, position, introductionText);

  useEffect(() => {
    if (!isLoading) {
      setTeamName(participantInfo?.teamName || '');
      setPosition(participantInfo?.position || '');
      setIntroductionText(participantInfo?.introductionText || '');
    }
  }, [isLoading]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div>
      <div className="relative overflow-hidden rounded-[4px] rounded-b-xl bg-orange-500 pb-5 pt-16">
        <img
          src="src/assets/images/img_share_card_graphic.png"
          className="absolute w-full -translate-y-1/3 transform"
        />
        <div className="relative z-10 mx-5 flex flex-col items-center rounded-[4px] bg-gray-900 px-3 py-10">
          <h1 className="font-ydestreet mb-5 text-3xl text-gray-50">권나연</h1>
          <QRCodeSVG value="https://reactjs.org/" />
          <p className="text-body-2 mb-4 mt-6 text-gray-400">example.example.com</p>
          <ul className="flex gap-1">
            <li className="flex h-9 w-9 items-center justify-center rounded bg-gray-700">
              <LinkedInSvg className="w-6" />
            </li>
            <li className="flex h-9 w-9 items-center justify-center rounded bg-gray-700">
              <GtihubSvg className="w-6" />
            </li>
            <li className="flex h-9 w-9 items-center justify-center rounded bg-gray-700">
              <InstagramSvg className="w-6" />
            </li>
          </ul>
        </div>
      </div>
      <div className="rounded-[4px] rounded-t-xl bg-gray-900 p-5 pb-7">
        <li className="flex flex-wrap items-center gap-x-1 gap-y-2 leading-10">
          <ShareCardLabel>
            이번 해커톤에서{' '}
            <span
              contentEditable
              className="text-body-3 break-all rounded-[4px] bg-gray-800 px-2 py-[6px] leading-10 text-gray-200 placeholder:text-gray-600"
            >
              팀에서
            </span>
            팀에서
          </ShareCardLabel>
          {/* <ShareCardInput initalValue={teamName} onChange={(input) => setTeamName(input)} placeholder='팀이름'/>
        <ShareCardLabel></ShareCardLabel>
        <ShareCardInput initalValue={position} onChange={(input) => setPosition(input)} placeholder='직군'/>
        <ShareCardLabel>역할을 맡아</ShareCardLabel>
        <ShareCardInput initalValue={introductionText} onChange={(input) => setIntroductionText(input)} placeholder='프로젝트 한 줄 소개'/>
        <ShareCardLabel>를</ShareCardLabel>
        <ShareCardLabel>만들었어요.</ShareCardLabel> */}
        </li>
        <div className="mt-3 flex justify-end">
          <EditButton />
        </div>
      </div>
    </div>
  );
}

export default ShareCard;

function EditButton() {
  return (
    <button className="text-button-5 flex items-center gap-0.5 text-gray-500">
      <EditSvg /> 수정하기
    </button>
  );
}

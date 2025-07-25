import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import NoticeInfo from '@/components/common/NoticeInfo';
import TabSelector from './TabSelector';
import CompactTabPanel from './CompactTabPanel';
import LockSvg from '@/assets/icons/ic_lock.svg?react';
import { useEventProfileStore } from '@/stores/useEventProfileStore';
import BaseButton from '@/components/common/BaseButton';
import Input from '@/components/common/Input';
import { useMutateGetProfileByPin } from '@/hooks/useQueryGetProfileByPin';
import { EVENT_ID } from '@/constants/eventId';
import EventProfileCard from '../card/EventProfileCard';
import { EventProfileState } from '@/types';
import { useQueryRegisterParticipant } from '@/hooks/useQueryRegisterParticipant';
import WebcamCapture from './WebcamCapture';
import { BrowserQRCodeReader } from '@zxing/browser';
import toast from 'react-hot-toast';

export default function ShareSection() {
  const qrReader = new BrowserQRCodeReader();
  const [activeTab, setActiveTab] = useState('share');
  const [receiveMethod, setReceiveMethod] = useState('qr');
  const [pinInput, setPinInput] = useState('');
  const [qrText, setQrText] = useState('');
  const { isProfileComplete, myPinNumber } = useEventProfileStore();
  const {
    mutate: mutateGetProfile,
    data: profile,
    isPending: isGetProfilePending,
  } = useMutateGetProfileByPin(EVENT_ID);
  const { mutate: mutateRegisterParticipant } = useQueryRegisterParticipant(EVENT_ID);

  const handlePinSubmit = () => {
    if (pinInput.length === 4) {
      handleRegisterAndShowProfile(pinInput);
    }
  };

  const handleRegisterAndShowProfile = (pinNumber: string) => {
    mutateGetProfile(pinNumber);
    mutateRegisterParticipant(pinNumber);
    toast.success('명함을 교환에 성공했습니다!');
    setPinInput('');
  };

  const handleImage = async (imageSrc: string) => {
    try {
      const result = await qrReader.decodeFromImageUrl(imageSrc);
      if (result?.getText && result.getText() !== qrText) {
        setQrText(result.getText());
        const pinNumber = result.getText();
        handleRegisterAndShowProfile(pinNumber);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      {!isGetProfilePending && profile && (
        <div className="background fixed inset-0 z-50 flex flex-col items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => {}} />
          <EventProfileCard
            state={EventProfileState.READONLY}
            profile={profile.profile}
            eventName="CODE:ME"
            graphicNumber={profile.imageIndex}
            content={profile.content}
          />
        </div>
      )}
      <div className="wrapper">
        <div className="my-2 flex h-12 items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">명함 공유</h3>
        </div>

        {!isProfileComplete ? (
          <div className="flex flex-col items-center rounded-3xl bg-gray-50 p-10">
            <LockSvg width={60} height={60} className="mb-7 mt-4" />
            <div className="flex flex-col gap-2 text-center">
              <p className="text-lg font-medium leading-7 tracking-tight text-gray-600">
                앗! 명함을 완성하기 전까지
                <br />
                사용하실 수 없어요!
              </p>
              <p className="leading-6 tracking-tight text-gray-400">
                명함을 먼저 완성해 주시면
                <br />
                다른 사람과 명함을 주고받을 수 있어요
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <TabSelector
                tabConfigs={[
                  { label: '내 명함 공유', value: 'share' },
                  { label: '명함 받기', value: 'receive' },
                ]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            {activeTab === 'share' && (
              <div className="mt-6 flex w-full flex-col items-center gap-4">
                <div className="mx-auto flex aspect-square max-h-56 w-full max-w-56 items-center justify-center rounded-2xl bg-white p-4">
                  <QRCodeSVG value={myPinNumber} className="h-52 w-full" />
                </div>
                <div className="flex justify-center gap-3">
                  {myPinNumber
                    ?.toString()
                    .split('')
                    .map((digit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center rounded-xl bg-gray-50 px-5 py-5"
                      >
                        <span className="text-4xl font-bold text-gray-900">{digit}</span>
                      </div>
                    ))}
                </div>
                <NoticeInfo>상대방이 스캔할 수 있도록 보여주세요</NoticeInfo>
              </div>
            )}
            {activeTab === 'receive' && (
              <CompactTabPanel
                title="명함 받기"
                activeTab={receiveMethod}
                setActiveTab={setReceiveMethod}
                tabConfigs={[
                  {
                    label: 'QR 코드',
                    value: 'qr',
                    content: (
                      <div className="my-6 flex flex-col items-center gap-4">
                        <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-gray-50">
                          <WebcamCapture onCapture={handleImage} />;
                        </div>
                        <NoticeInfo> 상대방의 QR 코드를 카메라로 스캔하세요</NoticeInfo>
                      </div>
                    ),
                  },
                  {
                    label: 'PIN 번호',
                    value: 'pin',
                    content: (
                      <div className="flex flex-col gap-3 pt-4">
                        <Input
                          placeholder="핀번호 입력"
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) =>
                            setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))
                          }
                        />
                        <BaseButton isDisabled={pinInput.length !== 4} onClick={handlePinSubmit}>
                          {pinInput.length === 4
                            ? '명함 가져오기'
                            : `${4 - pinInput.length}자리 더 입력하세요`}
                        </BaseButton>

                        <div className="mt-4 flex flex-col items-center">
                          <NoticeInfo> 상대방이 알려준 PIN 번호를 입력하세요</NoticeInfo>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

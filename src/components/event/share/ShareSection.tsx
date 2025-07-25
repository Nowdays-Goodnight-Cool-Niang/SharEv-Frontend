import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRScanner from './QRScanner';
import NoticeInfo from '@/components/common/NoticeInfo';
import TabSelector from './TabSelector';
import CompactTabPanel from './CompactTabPanel';
import LockSvg from '@/assets/icons/ic_lock.svg?react';
import { useEventProfileStore } from '@/stores/useEventProfileStore';
import { useSuspenseQueryEventProfile } from '@/hooks/useQueryEventProfile';
export default function ShareSection() {
  const { data } = useSuspenseQueryEventProfile;
  const [activeTab, setActiveTab] = useState('share');
  const [shareMethod, setShareMethod] = useState('qr');
  const [receiveMethod, setReceiveMethod] = useState('qr');
  const [pinInput, setPinInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const { isProfileComplete } = useEventProfileStore();
  // 예시 데이터
  const myPin = '1234';
  const myQRData = 'https://mycard.com/user/123456';

  const handlePinSubmit = () => {
    if (pinInput.length === 6) {
      alert(`PIN ${pinInput}으로 명함을 검색합니다.`);
      setPinInput('');
    }
  };

  const handleCameraCapture = () => {
    setCameraActive(true);
    setTimeout(() => {
      setCameraActive(false);
      alert('QR 코드를 스캔했습니다!');
    }, 2000);
  };

  return (
    <div className="">
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
              <CompactTabPanel
                title="내 명함 공유"
                activeTab={shareMethod}
                setActiveTab={setShareMethod}
                tabConfigs={[
                  {
                    label: 'QR 코드',
                    value: 'qr',
                    content: (
                      <div className="mt-6 flex w-full flex-col items-center gap-4">
                        <div className="mx-auto flex aspect-square max-h-56 w-full max-w-56 items-center justify-center rounded-2xl bg-white p-4">
                          <QRCodeSVG value={'123'} className="h-52 w-full" />
                        </div>
                        <NoticeInfo>상대방이 스캔할 수 있도록 보여주세요</NoticeInfo>
                      </div>
                    ),
                  },
                  {
                    label: 'PIN 번호',
                    value: 'pin',
                    content: (
                      <div className="mt-6 space-y-4 text-center">
                        <div className="mb-6 flex w-full flex-col items-center gap-4">
                          <div className="flex justify-center gap-3">
                            {myPin.split('').map((digit, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-center rounded-xl bg-gray-50 px-5 py-5"
                              >
                                <span className="text-4xl font-bold text-gray-900">{digit}</span>
                              </div>
                            ))}
                          </div>
                          <NoticeInfo>상대방에게 이 번호를 알려주세요</NoticeInfo>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
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
                          <QRScanner />
                        </div>
                        <NoticeInfo> 상대방의 QR 코드를 카메라로 스캔하세요</NoticeInfo>
                      </div>
                    ),
                  },
                  {
                    label: 'PIN 번호',
                    value: 'pin',
                    content: (
                      <div className="pt-4">
                        <input
                          type="text"
                          value={pinInput}
                          onChange={(e) =>
                            setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))
                          }
                          placeholder="4자리 입력"
                          className="mb-3 w-full rounded-xl bg-gray-50 px-5 py-3 text-center font-bold text-gray-800 transition-colors placeholder:text-gray-300/50 focus:border-gray-400/10 focus:outline-none"
                          maxLength={4}
                        />
                        <button
                          onClick={handlePinSubmit}
                          disabled={pinInput.length !== 4}
                          className={`w-full rounded-xl px-6 py-4 font-semibold transition-all duration-200 ${
                            pinInput.length === 4
                              ? 'bg-gray-100 text-gray-900'
                              : 'cursor-not-allowed bg-gray-100 text-gray-400'
                          }`}
                        >
                          {pinInput.length === 4
                            ? '명함 가져오기'
                            : `${4 - pinInput.length}자리 더 입력하세요`}
                        </button>
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

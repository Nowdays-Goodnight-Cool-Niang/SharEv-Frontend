import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRScanner from './QRScanner';
import Header from '../common/Header';
import NoticeInfo from '../common/NoticeInfo';

export default function ShareSection() {
  const [activeTab, setActiveTab] = useState('share');
  const [shareMethod, setShareMethod] = useState('qr');
  const [receiveMethod, setReceiveMethod] = useState('qr');
  const [pinInput, setPinInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

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
      <Header title="명함 공유" />
      <div className="wrapper">
        <div className="mb-6 mt-2 flex rounded-full bg-gray-100/80 p-1 tracking-tight">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-medium transition-all duration-200 ${
              activeTab === 'share' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500'
            }`}
          >
            <span className="">내 명함 공유</span>
          </button>
          <button
            onClick={() => setActiveTab('receive')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-medium transition-all duration-200 ${
              activeTab === 'receive' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500'
            }`}
          >
            <span className="">명함 받기</span>
          </button>
        </div>

        {activeTab === 'share' && (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold leading-7 tracking-tight text-gray-800">
                내 명함 공유
              </h2>

              <div className="flex rounded-lg bg-gray-200 p-1">
                <button
                  onClick={() => setShareMethod('qr')}
                  className={`rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 ${
                    shareMethod === 'qr' ? 'bg-white text-gray-600' : 'text-gray-500'
                  }`}
                >
                  QR 코드
                </button>
                <button
                  onClick={() => setShareMethod('pin')}
                  className={`rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 ${
                    shareMethod === 'pin' ? 'bg-white text-gray-600' : 'text-gray-500'
                  }`}
                >
                  PIN 번호
                </button>
              </div>
            </div>

            {shareMethod === 'qr' && (
              <>
                <div className="mt-6 flex w-full flex-col items-center gap-2 rounded-3xl border border-gray-100 p-8">
                  <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-3xl bg-white shadow-sm">
                    <QRCodeSVG value={'123'} className={`h-52 w-full`} />
                  </div>
                  <NoticeInfo> 상대방이 스캔할 수 있도록 보여주세요</NoticeInfo>
                </div>
              </>
            )}
            {shareMethod === 'pin' && (
              <>
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <div className="mb-6 flex w-full flex-col items-center gap-2 rounded-2xl border border-gray-200 p-8">
                      <div className="mb-4 flex justify-center gap-4">
                        {myPin.split('').map((digit, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-5"
                          >
                            <span className="font-mono text-4xl font-bold text-gray-900">
                              {digit}
                            </span>
                          </div>
                        ))}
                      </div>
                      <NoticeInfo> 상대방에게 이 번호를 알려주세요</NoticeInfo>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'receive' && (
          <div className="">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold leading-7 tracking-tight text-gray-800">
                명함 받기
              </h2>

              <div className="flex rounded-lg bg-gray-200 p-1">
                <button
                  onClick={() => setReceiveMethod('qr')}
                  className={`rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 ${
                    receiveMethod === 'qr' ? 'bg-white text-gray-600' : 'text-gray-500'
                  }`}
                >
                  QR 코드
                </button>
                <button
                  onClick={() => setReceiveMethod('pin')}
                  className={`rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 ${
                    receiveMethod === 'pin' ? 'bg-white text-gray-600' : 'text-gray-500'
                  }`}
                >
                  PIN 번호
                </button>
              </div>
            </div>

            {/* PIN 입력 */}
            {receiveMethod === 'pin' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="my-6 flex w-full flex-col items-center gap-2 rounded-3xl border border-gray-200 p-8">
                    <input
                      type="text"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="4자리 입력"
                      className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-6 text-center font-mono text-3xl font-bold tracking-widest transition-colors focus:border-gray-400 focus:outline-none"
                      maxLength="4"
                    />
                    <NoticeInfo> 상대방이 알려준 PIN 번호를 입력하세요</NoticeInfo>
                  </div>

                  <button
                    onClick={handlePinSubmit}
                    disabled={pinInput.length !== 4}
                    className={`w-full rounded-2xl px-6 py-4 font-semibold transition-all duration-200 ${
                      pinInput.length === 4
                        ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
                        : 'cursor-not-allowed bg-gray-200 text-gray-500'
                    }`}
                  >
                    {pinInput.length === 4
                      ? '명함 가져오기'
                      : `${4 - pinInput.length}자리 더 입력하세요`}
                  </button>
                </div>
              </div>
            )}

            {/* QR 스캔 */}
            {receiveMethod === 'qr' && (
              <div className="my-6 flex w-full flex-col items-center gap-2 rounded-3xl border border-gray-200 p-8">
                <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gray-200">
                  <QRScanner />
                </div>
                <NoticeInfo> 상대방의 QR 코드를 카메라로 스캔하세요</NoticeInfo>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

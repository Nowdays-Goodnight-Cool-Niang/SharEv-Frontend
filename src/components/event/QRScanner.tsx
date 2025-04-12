import { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import WebcamCapture from './WebcamCapture';
import NoticeInfo from '../common/NoticeInfo';
import { participantAPI } from '@/apis/participants';

import toast from 'react-hot-toast';

const qrReader = new BrowserQRCodeReader();

const QRScanner = () => {
  const [qrText, setQrText] = useState('');

  const handleImage = async (imageSrc: string) => {
    try {
      const result = await qrReader.decodeFromImageUrl(imageSrc);
      if (result?.getText && result.getText() !== qrText) {
        setQrText(result.getText());
        const id = result.getText();
        await participantAPI.postParticipant(id);
        toast.success('QR이 등록되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="wrapper mt-11 w-full">
        <NoticeInfo>
          카메라로 행사장에 있는 다른 사람의 QR을 스캔해 프로필을 확인해 보세요
        </NoticeInfo>
      </div>
      <WebcamCapture onCapture={handleImage} />
    </div>
  );
};

export default QRScanner;

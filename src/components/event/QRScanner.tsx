import { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import WebcamCapture from './WebcamCapture';
import NoticeInfo from '../common/NoticeInfo';
import { participantAPI } from '@/apis/participants';

import toast from 'react-hot-toast';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';

const qrReader = new BrowserQRCodeReader();

const QRScanner = () => {
  const [qrText, setQrText] = useState('');
  const { refetch } = useQueryParticipants();

  const handleImage = async (imageSrc: string) => {
    try {
      const result = await qrReader.decodeFromImageUrl(imageSrc);
      if (result?.getText && result.getText() !== qrText) {
        setQrText(result.getText());
        const id = result.getText();
        await participantAPI.postParticipant(id);
        await refetch();
        toast.success('QR이 등록되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <WebcamCapture onCapture={handleImage} />;
};

export default QRScanner;

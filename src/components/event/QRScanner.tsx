import { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import WebcamCapture from './WebcamCapture';

const qrReader = new BrowserQRCodeReader();

const QRScanner = () => {
  const [qrText, setQrText] = useState('');

  const handleImage = async (imageSrc: string) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);

      try {
        console.log('=======');
        const result = await qrReader.decodeFromImageElement(image);
        console.log(result);
        if (result?.getText && result.getText() !== qrText) {
          setQrText(result.getText());
          console.log('✅ QR 인식:', result.getText());
        }
      } catch (err) {
        // 실패했을 경우 아무것도 하지 않음
        console.log(err);
      }
    };
  };

  return (
    <div className="flex flex-col items-center">
      <WebcamCapture onCapture={handleImage} />
      <p className="mt-4 text-lg text-green-700">{qrText}</p>
    </div>
  );
};

export default QRScanner;

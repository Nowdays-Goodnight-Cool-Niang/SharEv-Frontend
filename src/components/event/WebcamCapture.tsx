import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import LoadingSpinner from '../common/LoadingSpinner';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: 'environment',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      capture();
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) onCapture(imageSrc);
  };

  return (
    <div className="relative aspect-square w-full">
      {isLoading && (
        <div className="absolute flex aspect-square w-full flex-col items-center justify-center gap-4 bg-gray-900">
          <LoadingSpinner />
          <span className="text-body-1 text-gray-50">카메라를 불러오고 있습니다...</span>
        </div>
      )}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={() => setIsLoading(false)}
        className="absolute h-full w-full object-cover"
      />
    </div>
  );
};

export default WebcamCapture;

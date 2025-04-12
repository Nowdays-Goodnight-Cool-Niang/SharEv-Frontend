import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      capture();
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: 'environment',
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) onCapture(imageSrc);
  };

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
  );
};

export default WebcamCapture;

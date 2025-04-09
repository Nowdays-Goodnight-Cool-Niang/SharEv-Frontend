import { useEffect, useRef, useState } from 'react';

export default function QRCameraSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <QrScanner />
    </div>
  );
}

// components/QrScanner.tsx

function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    let frameInterval: number;

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        if (!('BarcodeDetector' in globalThis)) {
          console.log('Barcode Detector is not supported by this browser.');
        } else {
          console.log('Barcode Detector supported!');
        }

        const detector = new BarcodeDetector({ formats: ['qr_code'] });

        frameInterval = window.setInterval(async () => {
          if (!videoRef.current) return;
          try {
            const detections = await detector.detect(videoRef.current);
            if (detections.length > 0) {
              const rawValue = detections[0].rawValue;
              setQrResult(rawValue);
              clearInterval(frameInterval); // stop scanning
              stream.getTracks().forEach((track) => track.stop());
            }
          } catch (e) {
            console.error('QR detection error', e);
          }
        }, 500);
      } catch (err) {
        console.error(err);
        setError('카메라 접근이 거부되었거나 사용할 수 없습니다.');
      }
    };

    setupCamera();

    return () => {
      clearInterval(frameInterval);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {!qrResult && <video ref={videoRef} className="w-full max-w-sm rounded-lg" />}
      {qrResult && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-white">✅ QR 인식됨:</p>
          <a
            href={qrResult}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {qrResult}
          </a>
        </div>
      )}
    </div>
  );
}

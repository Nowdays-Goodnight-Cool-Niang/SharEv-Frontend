import { QRCodeSVG } from 'qrcode.react';
import { ReactNode } from 'react';

interface QRBoxProps {
  url?: string;
  isAvailable?: boolean;
  inValidText?: ReactNode;
}

export function QRBox({ url, isAvailable = false }: QRBoxProps) {
  return (
    <div className="relative h-32 w-32">
      <div className={isAvailable ? '' : 'blur-[2px]'}>
        <QRCodeSVG value={url} className={`h-full w-full ${!isAvailable && 'opacity-10'}`} />
      </div>
      {!isAvailable && (
        <div className="text-body-4 absolute inset-0 flex items-center justify-center px-2 text-center text-gray-400">
          프로필 입력 후<br /> 사용할 수 있어요
        </div>
      )}
    </div>
  );
}

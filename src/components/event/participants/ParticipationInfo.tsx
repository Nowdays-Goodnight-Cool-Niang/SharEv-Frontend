import UsersSvg from '@/assets/icons/ic_users.svg?react';
import CardSvg from '@/assets/icons/ic_card.svg?react';
import { useState } from 'react';

interface ParticipationInfoProps {
  totalCount: number;
  registerCount: number;
}

export default function ParticipationInfo({ totalCount, registerCount }: ParticipationInfoProps) {
  const [open, setOpen] = useState(true);
  return (
    <div
      onClick={() => {
        if (!open) setOpen(true);
      }}
      className={`flex items-center rounded-2xl transition-all duration-300 ${open ? 'justify-between gap-7 py-4 pl-5 pr-4' : 'h-16 w-16 justify-center'} bg-white shadow-md`}
    >
      {!open && (
        <div className="flex flex-col">
          <UsersSvg width={28} height={28} />
          <div className="flex">
            <span className="text-sm font-medium text-blue-500">{registerCount}</span>
            <span className="text-sm font-medium text-gray-500">/{totalCount}</span>
          </div>
        </div>
      )}
      {open && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <UsersSvg width={24} height={24} />
            <p className="tracking-tight text-gray-500">
              <span className="font-medium text-gray-500">{totalCount}</span>명 중{' '}
              <span className="font-medium text-blue-500">{registerCount}</span>명과 명함을
              교환했어요
            </p>
          </div>
          <div className="relative">
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full w-0 rounded-full bg-blue-500 transition-all duration-300"
                style={{
                  width: `${(registerCount / totalCount) * 100 || 0}%`,
                }}
              ></div>
            </div>
            <CardSvg
              width={26}
              height={26}
              className="absolute -top-1.5 transition-all duration-300"
              style={{
                left: `calc(${(registerCount / totalCount) * 100 || 0}% - 13px)`,
              }}
            />
          </div>
        </div>
      )}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="h-fit w-fit rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-medium tracking-tight text-gray-500"
        >
          접기
        </button>
      )}
    </div>
  );
}

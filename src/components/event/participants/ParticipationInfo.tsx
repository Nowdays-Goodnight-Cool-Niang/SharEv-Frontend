import UsersSvg from '@/assets/icons/ic_users.svg?react';
import CardSvg from '@/assets/icons/ic_card.svg?react';
import { useParticipationInfoStore } from '@/stores/useParticipationInfoStore';

interface ParticipationInfoProps {
  totalCount: number;
  registerCount: number;
}

export default function ParticipationInfo({ totalCount, registerCount }: ParticipationInfoProps) {
  const { isOpen, open, close } = useParticipationInfoStore();

  const isNoneExchanged = registerCount === 0;
  const isAllExchanged = registerCount === totalCount;

  return (
    <div
      onClick={() => {
        if (!isOpen) open();
      }}
      className={`flex items-center rounded-2xl transition-all duration-300 ${isOpen ? 'justify-between gap-7 py-4 pl-5 pr-4' : 'justify-center px-5 py-3 hover:cursor-pointer'} bg-white shadow-md`}
    >
      {!isOpen && (
        <div className="flex flex-col items-center gap-0.5">
          <UsersSvg width={32} height={32} />
          <div className="flex">
            <span className="text-sm font-medium text-blue-500">{registerCount}</span>
            <span className="text-sm font-medium text-gray-500">/{totalCount}명</span>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <UsersSvg width={24} height={24} />
            <p className="tracking-tight text-gray-500">
              {isNoneExchanged && <span>아직 명함을 교환하지 않았어요</span>}
              {isAllExchanged && <span>모든 참가자와 명함을 교환했어요!</span>}
              {!isNoneExchanged && !isAllExchanged && (
                <span>
                  <span className="font-medium text-gray-500">{totalCount}</span>명 중{' '}
                  <span className="font-medium text-blue-500">{registerCount}</span>명과 명함을
                  교환했어요
                </span>
              )}
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
      {isOpen && (
        <button
          onClick={() => close()}
          className="h-fit w-fit rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-medium tracking-tight text-gray-500"
        >
          접기
        </button>
      )}
    </div>
  );
}

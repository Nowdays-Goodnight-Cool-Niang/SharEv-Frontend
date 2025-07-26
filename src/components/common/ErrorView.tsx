import ErrorSvg from '@/assets/icons/ic_error.svg?react';
import { ROUTES } from '@/constants/routes';

export default function ErrorView() {
  return (
    <div className="wrapper flex h-full flex-1 flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center rounded-3xl bg-gray-50 py-10">
        <ErrorSvg width={60} height={60} className="mb-7 mt-4" />
        <div className="flex flex-col items-center gap-7">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-lg font-medium leading-7 tracking-tight text-gray-600">
              앗! 오류가 발생했어요!
            </p>
            <p className="leading-6 tracking-tight text-gray-400">잠시 후에 다시 시도해 주세요</p>
          </div>
          <button
            onClick={() => {
              window.location.replace(ROUTES.ROOT);
            }}
            className="h-12 w-36 rounded-2xl bg-white font-medium tracking-tight text-gray-600"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

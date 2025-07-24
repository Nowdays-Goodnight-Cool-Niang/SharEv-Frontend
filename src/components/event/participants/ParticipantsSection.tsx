import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';
import GridGraySvg from '@/assets/icons/ic_grid_gray.svg?react';
import StackGraySvg from '@/assets/icons/ic_stack_gray.svg?react';
import UsersSvg from '@/assets/icons/ic_users.svg?react';
import CardSvg from '@/assets/icons/ic_card.svg?react';
import ViewTabs from './ViewTabs';
import { useState } from 'react';
import CardSlider from './CardSlider';
import { getGraphicImageByNumber } from '@/utils/graphic';

export default function ParticipantsSection() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <>
      <div className="w-full">
        <div className="wrapper sticky top-14 z-20 my-2 flex h-12 w-full items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">참가자 명함</h3>
          </div>

          <div className="flex items-center justify-between">
            <ViewTabs
              tabs={[
                {
                  key: 'grid',
                  icon: {
                    active: <GridSvg width={20} height={20} />,
                    inactive: <GridGraySvg width={20} height={20} />,
                  },
                  label: '전체',
                  value: 'grid',
                },
                {
                  key: 'slide',
                  icon: {
                    active: <StackSvg width={20} height={20} />,
                    inactive: <StackGraySvg width={20} height={20} />,
                  },
                  label: '하나씩',
                  value: 'slide',
                },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          </div>
        </div>

        {viewMode === 'grid' && (
          <ul className="wrapper mt-4 grid grid-cols-2 gap-3">
            {Array.from({ length: 32 }).map((item) => (
              <li className="relative flex aspect-[5/7] w-full flex-col items-center gap-4 overflow-hidden rounded-2xl bg-gray-900">
                <div className="z-10 flex h-full w-full flex-col justify-between px-4 pb-4 pt-6">
                  <div className="flex flex-col gap-1">
                    <p className="w-full text-lg leading-7 tracking-tight text-gray-500">CODE:ME</p>
                    <p className="w-full text-2xl font-semibold leading-7 tracking-tight text-white">
                      김주호
                    </p>
                  </div>
                  <div
                    className={`flex w-fit flex-col items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900`}
                  >
                    미리보기
                  </div>
                </div>
                <div className="absolute bottom-0 flex aspect-square w-full flex-col items-center justify-center">
                  <img
                    src={getGraphicImageByNumber(1)}
                    className="opacity-40 brightness-50 filter translate-x-12 translate-y-10 scale-125"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {viewMode === 'slide' && <CardSlider />}
      </div>
      <div className="wrapper fixed bottom-20 z-30 flex flex-col items-center">
        <div className="flex items-center justify-between gap-7 rounded-2xl bg-white py-4 pl-5 pr-4 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <UsersSvg width={24} height={24} />
              <p className="tracking-tight text-gray-600">
                <span className="font-medium text-gray-700">60</span>명 중{' '}
                <span className="font-medium text-blue-500">1</span>명과 명함을 교환했어요
              </p>
            </div>
            <div className="relative">
              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/2 rounded-full bg-blue-400"></div>
              </div>
              <CardSvg width={26} height={26} className="absolute -left-1 -top-1.5" />
            </div>
          </div>
          <button className="h-fit w-fit rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-medium tracking-tight text-gray-500">
            접기
          </button>
        </div>
      </div>
    </>
  );
}

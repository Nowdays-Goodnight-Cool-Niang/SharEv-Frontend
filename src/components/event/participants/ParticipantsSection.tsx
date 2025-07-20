import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';
import UsersSvg from '@/assets/icons/ic_users.svg?react';
import ViewTabs from './ViewTabs';
import CharacterSvg from '@/assets/icons/ic_character_1.svg?react';
import Header from '../../common/Header';
import { useState } from 'react';
import CardSlider from './CardSlider';

export default function ParticipantsSection() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <>
      <div className="relative h-full w-full overflow-x-hidden">
        <Header title="참가자 명함" />
        <div className="wrapper sticky top-14 z-50 w-full py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full border border-gray-200/10 bg-blue-100/20 px-4 py-3 backdrop-blur-sm">
              <div className="flex aspect-square h-5 w-5 items-center justify-center">
                <UsersSvg width={16} height={16} className="text-blue-100" />
              </div>
              <div className="flex w-full items-center gap-2">
                <p className="text-sm font-medium tracking-tight text-blue-100">
                  명함을 공유한 사람
                </p>
                <span className="whitespace-nowrap text-sm text-blue-100/40">
                  <span className="font-semibold text-blue-100">1</span>/13
                </span>
              </div>
            </div>
            <ViewTabs
              tabs={[
                { key: 'grid', icon: <GridSvg width={20} height={20} />, value: 'grid' },
                { key: 'slide', icon: <StackSvg width={20} height={20} />, value: 'slide' },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          </div>
        </div>

        {viewMode === 'grid' && (
          <ul className="mt-4 grid grid-cols-2 gap-y-12 md:grid-cols-3">
            {Array.from({ length: 32 }).map((item) => (
              <li className="flex flex-col items-center">
                <div className="flex aspect-square h-32 flex-col items-center justify-center rounded-full border border-white/10 bg-white/10">
                  <CharacterSvg width={88} height={88} />
                </div>
                <p className="mt-2 text-sm font-medium leading-7 tracking-tight text-gray-100">
                  김주호
                </p>
              </li>
            ))}
          </ul>
        )}

        {viewMode === 'slide' && <CardSlider />}
      </div>
    </>
  );
}

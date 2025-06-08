import { useState, useRef, useEffect } from 'react';
import ShareCard from '@/components/event/ShareCard';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';
import { IShareCard } from '@/types';
import LoadingSpinner from '../common/LoadingSpinner';

import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';

const dummyCards: IShareCard[] = [
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    linkedinUrl: 'https://linkedin.com/in/hong',
    githubUrl: 'https://github.com/hong',
    instagramUrl: 'https://instagram.com/hong',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 TypeScript를 사랑하는 개발자입니다!',
    registerFlag: true,
  },
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    linkedinUrl: 'https://linkedin.com/in/hong',
    githubUrl: 'https://github.com/hong',
    instagramUrl: 'https://instagram.com/hong',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 TypeScript를 사랑하는 개발자입니다!',
    registerFlag: true,
  },
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    linkedinUrl: 'https://linkedin.com/in/hong',
    githubUrl: 'https://github.com/hong',
    instagramUrl: 'https://instagram.com/hong',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 TypeScript를 사랑하는 개발자입니다!',
    registerFlag: true,
  },
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    linkedinUrl: 'https://linkedin.com/in/hong',
    githubUrl: 'https://github.com/hong',
    instagramUrl: 'https://instagram.com/hong',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 TypeScript를 사랑하는 개발자입니다!',
    registerFlag: true,
  },
  {
    id: '2',
    name: '김영희',
    email: 'kim@example.com',
    linkedinUrl: 'https://linkedin.com/in/kim',
    githubUrl: 'https://github.com/kim',
    instagramUrl: 'https://instagram.com/kim',
    teamName: 'Data Wizards',
    position: 'Data Scientist',
    introductionText: '데이터로 세상을 더 나은 곳으로!',
    registerFlag: false,
  },
  {
    id: '3',
    name: '박철수',
    email: 'park@example.com',
    linkedinUrl: 'https://linkedin.com/in/park',
    githubUrl: 'https://github.com/park',
    instagramUrl: 'https://instagram.com/park',
    teamName: 'Backend Ninjas',
    position: 'Backend Developer',
    introductionText: 'Go와 Node.js를 주로 사용합니다.',
    registerFlag: true,
  },
  {
    id: '4',
    name: '홍길동',
    email: 'hong@example.com',
    linkedinUrl: 'https://linkedin.com/in/hong',
    githubUrl: 'https://github.com/hong',
    instagramUrl: 'https://instagram.com/hong',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 TypeScript를 사랑하는 개발자입니다!',
    registerFlag: true,
  },
  {
    id: '5',
    name: '김영희',
    email: 'kim@example.com',
    linkedinUrl: 'https://linkedin.com/in/kim',
    githubUrl: 'https://github.com/kim',
    instagramUrl: 'https://instagram.com/kim',
    teamName: 'Data Wizards',
    position: 'Data Scientist',
    introductionText: '데이터로 세상을 더 나은 곳으로!',
    registerFlag: false,
  },
  {
    id: '6',
    name: '박철수',
    email: 'park@example.com',
    linkedinUrl: 'https://linkedin.com/in/park',
    githubUrl: 'https://github.com/park',
    instagramUrl: 'https://instagram.com/park',
    teamName: 'Backend Ninjas',
    position: 'Backend Developer',
    introductionText: 'Go와 Node.js를 주로 사용합니다.',
    registerFlag: true,
  },
];

export default function ParticipantSection() {
  const [isGrid, setIsGrid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useQueryParticipants();
  const [registerCount, setRegisterCount] = useState(0);
  const [cards, setCards] = useState<IShareCard[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const translateX = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    setCards(dummyCards);
    if (data && cards.length === 0) {
      //setCards(data.socialDexInfo.content);
      setRegisterCount(data.registerCount);
    }
  }, [data]);

  const start = (x: number) => {
    startX.current = x;
    dragging.current = true;
  };

  const move = (x: number) => {
    if (!dragging.current) return;
    const deltaX = x - startX.current;
    translateX.current = deltaX;
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  };

  const end = () => {
    if (!dragging.current) return;
    dragging.current = false;

    if (Math.abs(translateX.current) > 100) {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.3s ease-out';
        cardRef.current.style.transform = `translateX(${translateX.current > 0 ? '100%' : '-100%'})`;
      }

      setIsOpen(false);
      setTimeout(() => {
        const updated = [...cards.slice(1), cards[0]];
        setCards(updated);
        if (cardRef.current) {
          cardRef.current.style.transition = 'none';
          cardRef.current.style.transform = 'translateX(0)';
        }
      }, 200);
    } else {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.2s ease-in-out';
        cardRef.current.style.transform = 'translateX(0)';
      }
    }
    translateX.current = 0;
  };

  if (isLoading)
    return (
      <div className="w-full py-20">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <p className="text-white">데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <div className="flex flex-col h-full max-h-full wrapper" ref={containerRef}>
      <h1 className="mb-5 text-title-1 mt-11 text-gray-50">삐약톤 캠퍼스 대항전</h1>

      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-gray-300 text-title-2">행사 참여자</h2>
          <div className="text-label-2 rounded bg-orange-700 px-1.5 py-0.5">
            <span className="text-white">{registerCount}</span>
            <span className="text-gray-200">/{cards.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`${isGrid ? 'text-orange-500' : 'text-gray-600'} z-10 transition-colors duration-100`}
            onClick={() => setIsGrid(() => true)}
          >
            <GridSvg />
          </button>
          <button
            className={`${!isGrid ? 'text-orange-500' : 'text-gray-600'} z-10 transition-colors duration-100`}
            onClick={() => setIsGrid(() => false)}
          >
            <StackSvg />
          </button>
        </div>
      </div>

      <div
        className={`relative h-full w-full px-2 transition-all duration-500 ease-in-out ${
          isGrid ? 'grid grid-cols-2 gap-4' : ''
        }`}
      >
        {cards.map((card, i) => {
          const opacity = 1 - i * 0.3;
          const translateY = -i * 2;
          const scale = 1 - i * 0.05;
          const zIndex = cards.length - i;
          const isTop = i === 0;

          const cardStyle = isGrid
            ? { transition: 'all 0.3s ease-in-out' } // grid 모드 시 부드럽게 위치 이동
            : {
                zIndex,
                transform: `scale(${scale}) translateY(${translateY}rem)`,
                opacity,
                transition: 'all 0.3s ease-in-out',
              };

          return (
            <div
              key={card.id}
              ref={isTop && !isGrid ? cardRef : null}
              className={`${!isGrid && 'absolute'} w-full touch-none select-none transition-all duration-200`}
              style={cardStyle}
              onTouchStart={isTop ? (e) => start(e.touches[0].clientX) : undefined}
              onTouchMove={isTop ? (e) => move(e.touches[0].clientX) : undefined}
              onTouchEnd={isTop ? end : undefined}
              onMouseDown={isTop ? (e) => start(e.clientX) : undefined}
              onMouseMove={isTop ? (e) => move(e.clientX) : undefined}
              onMouseUp={isTop ? end : undefined}
              onMouseLeave={isTop ? end : undefined}
            >
              <ShareCard
                isOpen={isTop && isOpen}
                onToggle={() => {
                  if (card.registerFlag) setIsOpen((prev) => !prev);
                }}
                isReveal={card.registerFlag}
                profile={card}
                detail={card}
                isTop={isTop}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

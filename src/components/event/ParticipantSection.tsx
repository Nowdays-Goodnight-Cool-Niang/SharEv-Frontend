import { useState, useRef, useEffect } from 'react';
import ShareCard from '@/components/event/ShareCard';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';
import { IShareCard } from '@/types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ParticipantSection() {
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
    if (data && cards.length === 0) {
      setCards(data.socialDexInfo.content);
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
    <div className="wrapper flex h-full max-h-full flex-col overflow-hidden" ref={containerRef}>
      <h1 className="text-title-1 mb-5 mt-11 text-gray-50">삐약톤 캠퍼스 대항전</h1>
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-title-2 text-gray-300">행사 참여자</h2>
          <div className="text-label-2 rounded bg-orange-700 px-1.5 py-0.5">
            <span className="text-white">{registerCount}</span>
            <span className="text-gray-200">/{cards.length}</span>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full px-2">
        {cards.map((card, i) => {
          const opacity = 1 - i * 0.3;
          const translateY = -i * 2;
          const scale = 1 - i * 0.05;
          const zIndex = cards.length - i;
          const isTop = i === 0;

          return (
            <div
              key={card.id}
              ref={isTop ? cardRef : null}
              className="absolute h-full w-full touch-none select-none transition-all duration-200"
              style={{
                zIndex,
                transform: `scale(${scale}) translateY(${translateY}rem)`,
                opacity,
              }}
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

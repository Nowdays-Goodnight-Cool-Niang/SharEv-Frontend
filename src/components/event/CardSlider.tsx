import { useState, useRef, useEffect } from 'react';
import EventProfile from './EventProfile';

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);

  // 샘플 카드 데이터
  const cards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `카드 ${i + 1}`,
    subtitle: `서브타이틀 ${i + 1}`,
    description: `이것은 ${i + 1}번째 카드입니다. 좌우로 슬라이드하여 다른 카드들을 확인해보세요.`,
    color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`,
    icon: ['🎨', '🚀', '💡', '🎯', '🌟', '🔥', '⚡', '🎪', '🎭', '🎨'][i % 10],
  }));

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 50;

    // 스냅 로직: 임계값을 넘으면 다음/이전 카드로 이동
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setTranslateX(0);
  };

  // 마우스 이벤트
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 터치 이벤트
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startX, translateX]);

  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="absolute top-0 flex h-full w-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full">
          <div className="relative flex w-full items-center justify-center">
            {cards.map((card, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;

              return (
                <div
                  key={card.id}
                  className={`absolute w-full max-w-[21rem] cursor-grab select-none text-white shadow-2xl transition-all duration-300 active:cursor-grabbing ${
                    isActive ? 'z-10 scale-100' : 'z-0 scale-90'
                  }`}
                  style={{
                    transform: `translateX(${offset * 280 + translateX}px) scale(${isActive ? 1 : 0.9})`,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.6,
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <EventProfile />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 z-50 flex w-full justify-center">
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import EventProfileCard from '../card/EventProfileCard';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';
import { IPublicEventProfile } from '@/types/domain/event';
import { EventProfileState } from '@/constants/event';

export default function CardSlider({
  profiles,
  fetchNextPage,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
}: {
  profiles: IPublicEventProfile[];
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (translateX < 0 && currentIndex < profiles.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  useEffect(() => {
    if (!isDragging) return;

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
  }, [isDragging, handleMove, handleEnd]);

  // ✅ infinite scroll trigger
  useEffect(() => {
    if (currentIndex === profiles.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, profiles.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="absolute top-0 flex h-full w-full flex-col overflow-x-hidden py-96">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full">
          <div className="relative flex w-full items-center justify-center">
            {isLoading ? (
              <>
                {[0, 1].map((i) => (
                  <div
                    key={`skeleton-init-${i}`}
                    className={`absolute w-full max-w-[22rem] rounded-3xl ${i == 0 && 'shadow-2xl'}`}
                    style={{
                      transform: `translateX(${i * 280}px) scale(${i === 0 ? 1 : 0.9})`,
                      zIndex: i === 0 ? 10 : 5,
                    }}
                  >
                    <EventProfileCardSkeleton />
                  </div>
                ))}
              </>
            ) : (
              profiles.map((profile, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;

                return (
                  <div
                    key={index}
                    className={`absolute w-full max-w-[22rem] cursor-grab select-none rounded-3xl transition-all duration-300 active:cursor-grabbing ${
                      isActive ? 'z-10 shadow-2xl scale-100' : 'z-0 scale-90'
                    }`}
                    style={{
                      transform: `translateX(${offset * 280 + translateX}px) scale(${isActive ? 1 : 0.9})`,
                      opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.6,
                      zIndex: isActive ? 10 : 5 - Math.abs(offset),
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    <EventProfileCard
                      state={
                        profile.relationFlag ? EventProfileState.READONLY : EventProfileState.LOCKED
                      }
                      profile={profile}
                      eventName="CODE:ME"
                    />
                  </div>
                );
              })
            )}
            {isFetchingNextPage && hasNextPage && (
              <div
                className="absolute w-full max-w-[22rem]"
                style={{
                  transform: `translateX(${(profiles.length - currentIndex) * 280}px) scale(0.9)`,
                  zIndex: 1,
                }}
              >
                <EventProfileCardSkeleton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

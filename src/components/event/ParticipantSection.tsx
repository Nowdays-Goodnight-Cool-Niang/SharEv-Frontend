import { useState, useRef, useEffect } from 'react';
import ShareCard from '@/components/event/ShareCard';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';
import { IShareCard } from '@/types';
import LoadingSpinner from '../common/LoadingSpinner';

import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';
import { createPortal } from 'react-dom';
import dummyCards from './DummyData';

type AnimationType = 'start' | 'end';

export default function ParticipantSection() {
  const [isGrid, setIsGrid] = useState(false);
  const [registerCount, setRegisterCount] = useState(0);
  const { data, isLoading, isError } = useQueryParticipants();
  const [cards, setCards] = useState<IShareCard[]>([]);
  const FAKE_SCROLL_HEIGHT = cards.length * 50;

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [animatingCard, setAnimatingCard] = useState<null | IShareCard>(null);
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('start');
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const [portalVisible, setPortalVisible] = useState(false);
  const [portalShouldOpen, setPortalShouldOpen] = useState(false);

  const portalRef = useRef<HTMLDivElement>(null);
  const portalCardRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SCROLL_THRESHOLD = 50;

  useEffect(() => {
    setCards(dummyCards);
    if (data) setRegisterCount(data.registerCount);
  }, [data]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.scrollTop = 0;

    const handleScroll = () => {
      if (isGrid) return;

      const scrollY = scrollEl.scrollTop;

      if (scrollY > SCROLL_THRESHOLD) {
        setCards((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });
        scrollEl.scrollTop -= SCROLL_THRESHOLD;
      } else if (scrollY < -SCROLL_THRESHOLD) {
        setCards((prev) => {
          const last = prev[prev.length - 1];
          return [last, ...prev.slice(0, prev.length - 1)];
        });
        scrollEl.scrollTop += SCROLL_THRESHOLD;
      }
    };

    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [scrollRef.current, FAKE_SCROLL_HEIGHT]);

  if (isLoading)
    return (
      <div className="w-full py-20">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <p className="text-white">데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <>
      <div className="flex flex-col h-full max-h-full overflow-hidden">
        <div className="wrapper">
          <h1 className="mt-8 mb-3 text-2xl font-medium text-gray-50">삐약톤 캠퍼스 대항전</h1>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-medium text-gray-300">행사 참여자</h2>
              <div className="rounded bg-gray-600 px-1 py-0.5 text-xs font-medium">
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
        </div>
        <div
          ref={scrollRef}
          className="relative h-full overflow-y-scroll"
          style={{ overscrollBehavior: 'none' }}
        >
          <div
            className={`${animating || portalVisible ? 'z-10' : 'z-0'} absolute inset-0 overflow-x-hidden perspective-[2000px]`}
          >
            <div
              ref={portalRef}
              id="portal"
              className={`relative flex h-full w-full flex-col items-center justify-center transition-transform transform-style-3d ${(animating && animationType == 'start') || portalVisible || isGrid ? 'rotate-x-[0deg]' : '-rotate-x-[50deg]'}`}
            ></div>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-y-auto overflow-x-hidden perspective-[2000px]">
            <div
              className={`relative h-full w-full ${
                isGrid
                  ? 'grid grid-cols-2 gap-4'
                  : `flex flex-col items-center justify-center transition-transform duration-500 transform-style-3d ${
                      portalVisible || (animating && animationType === 'start')
                        ? 'translate-y-72 -rotate-x-[5deg]'
                        : '-rotate-x-[50deg]'
                    }`
              }`}
            >
              {cards.map((card, i) => {
                const isTargetHidden = animatingCard?.id === card.id || openCardId === card.id;
                const translateY = -i * 2;
                const translateZ = -i * 5 + 12;
                const rotate = i * 8 + -8;
                const scale = 1 - i * 0.05;
                const zIndex = cards.length - i;

                const cardStyle = isGrid
                  ? { transition: 'all 0.3s ease-in-out', opacity: isTargetHidden ? 0 : 1 }
                  : {
                      zIndex,
                      transform: `scale(${scale}) rotateX(${rotate}deg) translateY(${translateY}rem) translateZ(${translateZ}rem)`,
                      transformOrigin: 'bottom center',
                      opacity: isTargetHidden ? 0 : 1,
                      display: i < 6 ? 'block' : 'none',
                      transition: 'transform 0.3s ease-in-out',
                    };
                if (openCardId === card.id) console.log(translateY, translateZ, rotate, scale);
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardRefs.current[card.id ?? ''] = el;
                    }}
                    className={`${!isGrid && 'absolute'} pointer-events-auto touch-none select-none transition-transform duration-300 transform-style-3d`}
                    style={cardStyle}
                  >
                    <ShareCard
                      size={isGrid ? 'small' : 'default'}
                      isOpen={false}
                      onToggle={() => {
                        if (!card.registerFlag) return; // 상대방 카드 중 등록 되어있지 않은 카드면 무시
                        if (!card.id) return;

                        const cardDom = cardRefs.current[card.id];
                        if (!cardDom) return;

                        const clone = cardDom.cloneNode(true) as HTMLElement;
                        clone.style.pointerEvents = 'none';
                        clone.style.transition = 'transform 0.4s ease-in-out';

                        cloneRef.current = clone;

                        if (!portalRef.current) return;

                        portalRef.current.appendChild(clone);

                        const finalTransform = `scale(1) rotateX(${0}deg) translateY(${0}px) translateZ(${0}px)`;

                        setAnimating(true);
                        setAnimationType('start');
                        setAnimatingCard(card);

                        requestAnimationFrame(() => {
                          clone.style.transform = finalTransform;
                          console.log(clone.style.transform);
                        });

                        setTimeout(() => {
                          console.log('???');
                          portalRef.current?.removeChild(clone);
                          setAnimating(false);
                          setAnimatingCard(null);
                          setPortalVisible(true);
                          setOpenCardId(card.id ?? ''); // 이제 포탈로 렌더링
                          requestAnimationFrame(() => {
                            setPortalShouldOpen(true);
                          });
                        }, 400);
                      }}
                      isReveal={card.registerFlag}
                      profile={card}
                      detail={card}
                    />
                  </div>
                );
              })}
            </div>

            {portalVisible &&
              createPortal(
                <ShareCard
                  ref={portalCardRef}
                  key={openCardId}
                  size="default"
                  isOpen={portalShouldOpen}
                  isReveal={true}
                  profile={cards.find((c) => c.id === openCardId)}
                  detail={cards.find((c) => c.id === openCardId)}
                  onToggle={() => {
                    if (!openCardId) return;

                    const originalCard = cardRefs.current[openCardId];
                    const portalCard = portalCardRef.current;
                    if (!originalCard || !portalCard) return;

                    // 1. 카드 리스트 회전 되돌리기
                    setAnimating(true);
                    setAnimationType('end');
                    setAnimatingCard(cards.find((c) => c.id === openCardId) ?? null);

                    // 2. 카드 닫기 애니메이션
                    requestAnimationFrame(() => {
                      setPortalShouldOpen(false);
                    });

                    setTimeout(() => {
                      setPortalVisible(false);

                      const clone = cloneRef.current;
                      if (!clone || !portalRef.current) return;
                      portalRef.current.appendChild(clone);

                      requestAnimationFrame(() => {
                        if (isGrid) {
                          clone.style.transform = 'scale(1)';
                        } else {
                          clone.style.transform = originalCard.style.transform;
                        }
                      });

                      setTimeout(() => {
                        portalRef.current?.removeChild(clone);
                        setAnimating(false);
                        setAnimatingCard(null);

                        setOpenCardId(null);
                      }, 400);
                    }, 700);
                  }}
                />,
                document.getElementById('portal')!
              )}
          </div>
          {!isGrid && <div style={{ height: FAKE_SCROLL_HEIGHT }} />}
        </div>
      </div>
    </>
  );
}

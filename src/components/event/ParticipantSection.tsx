import { useState, useRef, useEffect } from 'react';
import ShareCard from '@/components/event/ShareCard';
import { useQueryParticipants } from '@/hooks/useQueryEventParticipants';
import { IShareCard } from '@/types';

import GridSvg from '@/assets/icons/ic_grid.svg?react';
import StackSvg from '@/assets/icons/ic_stack.svg?react';
import { createPortal } from 'react-dom';
import SkeletonCard from '../common/SkeletonCard';
import ViewTabs from './ViewTabs';
import RegisterCountBadge from './RegisterCountBadge';
import CardPortalContainer from './CardPortalContainer';

type AnimationType = 'start' | 'end';

export default function ParticipantSection() {
  const [isGrid, setIsGrid] = useState(true);
  const [registerCount, setRegisterCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useQueryParticipants();

  // Grid용 observer (마지막 요소 감지)
  const gridObserverRef = useRef<HTMLDivElement | null>(null);
  // Stack용 observer (특정 번호의 카드 감지)
  const stackObserverRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [openingCard, setOpeningCard] = useState<null | IShareCard>(null);
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('start');
  const [portalVisible, setPortalVisible] = useState(false);
  const [portalShouldOpen, setPortalShouldOpen] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  // Stack 뷰를 위한 별도 상태 관리
  const [stackStartIndex, setStackStartIndex] = useState(0);
  const [stackCards, setStackCards] = useState<IShareCard[]>([]);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const portalRef = useRef<HTMLDivElement>(null);
  const portalCardRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLElement | null>(null);

  const FAKE_SCROLL_HEIGHT = 2000;
  const SCROLL_THRESHOLD = 50;
  const STACK_VISIBLE_COUNT = 6; // Stack에서 보여줄 카드 개수

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    scrollEl.scrollTop = 0;
  }, [isGrid]);

  // 등록한 사람 수와 총 참가자 수
  useEffect(() => {
    if (data && data.pages && data.pages.length > 0) {
      setRegisterCount(data.pages[0].registerCount);
      setTotalCount(data.pages[0].totalCount);
    }
  }, [data]);

  // Stack 카드 데이터 업데이트
  useEffect(() => {
    const allParticipants = data?.pages.flatMap((page) => page.participants) ?? [];
    if (allParticipants.length > 0) {
      setStackCards(allParticipants);
    }
  }, [data]);

  // Grid용 Intersection Observer (마지막 요소 감지)
  useEffect(() => {
    if (!gridObserverRef.current || !isGrid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(gridObserverRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isGrid]);

  // Stack용 Intersection Observer (특정 번호의 카드 감지)
  useEffect(() => {
    if (!stackObserverRef.current || isGrid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(stackObserverRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isGrid]);

  // Stack 스크롤 이벤트 처리
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || isGrid) return;

    let lastScrollY = 0;
    let scrollAccumulator = 0; // 스크롤 누적값

    const handleScroll = () => {
      if (isGrid || isSliding) return;

      const currentScrollY = scrollEl.scrollTop;
      const scrollDelta = currentScrollY - lastScrollY;

      // 스크롤 누적값 계산
      scrollAccumulator += scrollDelta;

      // 스크롤 누적값이 임계값을 넘을 때만 카드 순서 변경
      if (Math.abs(scrollAccumulator) > SCROLL_THRESHOLD) {
        setIsSliding(true);
        setStackStartIndex((prev) => {
          const newIndex = (prev + 1) % stackCards.length;
          return newIndex;
        });

        // 누적값 초기화
        scrollAccumulator = 0;

        setTimeout(() => {
          setIsSliding(false);
          scrollEl.scrollTop = 0;
        }, 0);
      }

      lastScrollY = currentScrollY;
    };

    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [isGrid, isSliding, stackCards.length]);

  // Grid용 카드 데이터 (원본 순서 유지)
  const gridCards = data?.pages.flatMap((page) => page.participants) ?? [];

  // Stack용 카드 데이터 (순환 순서)
  const getStackDisplayCards = () => {
    if (stackCards.length === 0) return [];

    const displayCards: IShareCard[] = [];
    for (let i = 0; i < STACK_VISIBLE_COUNT; i++) {
      const index = (stackStartIndex + i) % stackCards.length;
      displayCards.push(stackCards[index]);
    }
    return displayCards;
  };

  const stackDisplayCards = getStackDisplayCards();

  // 카드 오픈/닫기 애니메이션 중에는 스크롤 비활성화
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    if (animating || portalVisible) {
      scrollEl.style.overflowY = 'hidden';
    } else {
      scrollEl.style.overflowY = 'scroll';
    }
  }, [animating, portalVisible]);

  const handlePortalClose = () => {
    if (!openingCard || !openingCard.id) return;

    const originalCard = cardRefs.current[openingCard.id];
    const portalCard = portalCardRef.current;
    if (!originalCard || !portalCard) return;

    // 1. 카드 리스트 회전 되돌리기
    setAnimating(true);
    setAnimationType('end');

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
        setOpeningCard(null);
      }, 400);
    }, 700);
  };

  if (error) return <p className="text-white">데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <>
      <div className="relative flex flex-col h-full max-h-full overflow-hidden">
        <div className="absolute top-0 z-20 w-full wrapper bg-gradient-to-b from-gray-800 to-gray-800/0">
          <h1 className="mb-1.5 mt-7 text-2xl font-medium text-gray-50">삐약톤 캠퍼스 대항전</h1>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium text-gray-300">행사 참여자</h2>
              <RegisterCountBadge registerCount={registerCount} totalCount={totalCount} />
            </div>
            <ViewTabs
              tabs={[
                { key: 'grid', icon: <GridSvg />, value: 'grid' },
                { key: 'stack', icon: <StackSvg />, value: 'stack' },
              ]}
              value={isGrid ? 'grid' : 'stack'}
              onChange={(v) => setIsGrid(v === 'grid')}
            />
          </div>
        </div>
        <CardPortalContainer
          portalRef={portalRef}
          rotating={(animating && animationType == 'start') || portalVisible || isGrid}
          elevated={animating || portalVisible}
        />
        <div
          ref={scrollRef}
          className="relative h-full overflow-y-scroll scroll-hide"
          style={{ overscrollBehavior: 'none' }}
        >
          {/* 그리드용 */}
          {isGrid && (
            <div className="relative grid w-full h-full grid-cols-2 py-20 gap-x-4">
              {gridCards.map((card, i, arr) => {
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardRefs.current[card.id ?? ''] = el;
                      if (i === arr.length - 1) gridObserverRef.current = el;
                    }}
                    className={`touch-none select-none transition-transform duration-300`}
                    style={{
                      transition: 'all 0.3s ease-in-out',
                      opacity: openingCard?.id === card.id ? 0 : 1,
                    }}
                  >
                    <ShareCard
                      size={'small'}
                      isOpen={false}
                      onToggle={() => {
                        if (!card.registerFlag) return;
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
                        setOpeningCard(card);

                        requestAnimationFrame(() => {
                          clone.style.transform = finalTransform;
                        });

                        setTimeout(() => {
                          portalRef.current?.removeChild(clone);
                          setAnimating(false);
                          setPortalVisible(true);
                          requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                              setPortalShouldOpen(true);
                            });
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
              {isLoading &&
                Array.from({ length: 10 }).map((_, idx) => (
                  <div className="flex h-[212.5px] items-center justify-center" key={idx}>
                    <SkeletonCard />
                  </div>
                ))}
              {isFetchingNextPage &&
                hasNextPage &&
                Array.from({ length: 10 }).map((_, idx) => (
                  <div className="flex h-[212.5px] items-center justify-center" key={idx}>
                    <SkeletonCard />
                  </div>
                ))}
            </div>
          )}

          {!isGrid && (
            <div className="pointer-events-none absolute inset-0 mt-20 overflow-y-auto overflow-x-hidden perspective-[2000px]">
              <div
                className={`relative flex h-full w-full flex-col items-center justify-center transition-transform duration-500 transform-style-3d ${
                  portalVisible || (animating && animationType === 'start')
                    ? 'translate-y-72 -rotate-x-[5deg]'
                    : '-rotate-x-[50deg]'
                }`}
              >
                {stackDisplayCards.map((card, i, arr) => {
                  const isTargetHidden = openingCard?.id === card.id;
                  const translateY = -i * 2;
                  const translateZ = -i * 5 + 12;
                  const rotate = i * 8 + -8;
                  const scale = 1 - i * 0.05;
                  const zIndex = arr.length - i;

                  const cardStyle = {
                    zIndex,
                    transform: `scale(${scale}) rotateX(${rotate}deg) translateY(${translateY}rem) translateZ(${translateZ}rem)`,
                    transformOrigin: 'bottom center',
                    opacity: isTargetHidden ? 0 : 1,
                    display: i < STACK_VISIBLE_COUNT ? 'block' : 'none',
                    transition: 'transform 0.5s ease-in-out',
                    transitionDelay: `${i * 0.1}s`,
                  };

                  return (
                    <div
                      key={card.id}
                      ref={(el) => {
                        cardRefs.current[card.id ?? ''] = el;
                        if (i === arr.length - 1) stackObserverRef.current = el;
                      }}
                      className={`pointer-events-auto absolute touch-none select-none transition-transform duration-300 transform-style-3d`}
                      style={cardStyle}
                    >
                      <ShareCard
                        isOpen={false}
                        onToggle={() => {
                          if (!card.registerFlag) return; // 상대방 카드 중 등록 되어있지 않은 카드면 무시
                          if (!card.id) return;

                          const cardDom = cardRefs.current[card.id];
                          if (!cardDom) return;

                          const scrollEl = scrollRef.current;
                          if (!scrollEl) return;

                          scrollEl.scrollTop = 0;

                          const clone = cardDom.cloneNode(true) as HTMLElement;
                          clone.style.pointerEvents = 'none';
                          clone.style.transition = 'transform 0.4s ease-in-out';

                          cloneRef.current = clone;

                          if (!portalRef.current) return;

                          portalRef.current.appendChild(clone);

                          const finalTransform = `scale(1) rotateX(${0}deg) translateY(${0}px) translateZ(${0}px)`;

                          setAnimating(true);
                          setAnimationType('start');
                          setOpeningCard(card);

                          requestAnimationFrame(() => {
                            clone.style.transform = finalTransform;
                          });

                          setTimeout(() => {
                            portalRef.current?.removeChild(clone);
                            setAnimating(false);
                            setPortalVisible(true);
                            requestAnimationFrame(() => {
                              requestAnimationFrame(() => {
                                setPortalShouldOpen(true);
                              });
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
            </div>
          )}

          {openingCard &&
            portalVisible &&
            createPortal(
              <ShareCard
                ref={portalCardRef}
                key={openingCard?.id || null}
                size="default"
                isOpen={portalShouldOpen}
                isReveal={true}
                profile={openingCard}
                detail={openingCard}
                onToggle={handlePortalClose}
              />,
              document.getElementById('portal')!
            )}
          {!isGrid && <div style={{ height: FAKE_SCROLL_HEIGHT }} />}
        </div>
      </div>
    </>
  );
}

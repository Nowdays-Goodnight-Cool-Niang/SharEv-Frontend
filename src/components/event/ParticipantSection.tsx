import { useState, useRef } from 'react';
import { IShareCard } from '@/types';
import ShareCard from '@/components/event/ShareCard';

const mockShareCards: IShareCard[] = [
  {
    id: '1',
    name: '김앨리스',
    email: 'alice@example.com',
    linkedinUrl: 'https://linkedin.com/in/alicekim',
    githubUrl: 'https://github.com/alicekim',
    instagramUrl: 'https://instagram.com/alice.dev',
    teamName: 'Frontend Avengers',
    position: 'Frontend Developer',
    introductionText: 'React와 UI/UX에 열정을 가진 개발자입니다.',
  },
  {
    id: '2',
    name: 'Brian Lee',
    email: 'brian@example.com',
    linkedinUrl: 'https://linkedin.com/in/brianlee',
    githubUrl: 'https://github.com/brianlee',
    instagramUrl: 'https://instagram.com/brian.codes',
    teamName: 'Data Wizards',
    position: 'Data Engineer',
    introductionText: '데이터로 가치를 만드는 일을 좋아합니다.',
  },
  {
    id: '3',
    name: 'Cathy Park',
    email: 'cathy@example.com',
    linkedinUrl: 'https://linkedin.com/in/cathypark',
    githubUrl: 'https://github.com/cathypark',
    instagramUrl: 'https://instagram.com/cathy.codes',
    teamName: 'AI Coders',
    position: 'ML Engineer',
    introductionText: '모델 학습과 튜닝에 관심 많아요!',
  },
  {
    id: '4',
    name: 'Daniel Choi',
    email: 'daniel@example.com',
    linkedinUrl: 'https://linkedin.com/in/danielchoi',
    githubUrl: 'https://github.com/danielchoi',
    instagramUrl: 'https://instagram.com/daniel.dev',
    teamName: 'Hackathon Bros',
    position: 'Fullstack Developer',
    introductionText: '빠르게 MVP를 구현하는 게 저의 강점입니다.',
  },
  {
    id: '5',
    name: 'Ella Jung',
    email: 'ella@example.com',
    linkedinUrl: 'https://linkedin.com/in/ellajung',
    githubUrl: 'https://github.com/ellajung',
    instagramUrl: 'https://instagram.com/ella.codes',
    teamName: 'UX Masters',
    position: 'UX Designer',
    introductionText: '사람을 생각하는 디자인을 추구합니다.',
  },
  {
    id: '6',
    name: 'Frank Yoo',
    email: 'frank@example.com',
    linkedinUrl: 'https://linkedin.com/in/frankyoo',
    githubUrl: 'https://github.com/frankyoo',
    instagramUrl: 'https://instagram.com/frank.codes',
    teamName: 'Dev Ninjas',
    position: 'Backend Developer',
    introductionText: '확장성과 유지보수가 쉬운 코드를 짭니다.',
  },
  {
    id: '7',
    name: 'Grace Han',
    email: 'grace@example.com',
    linkedinUrl: 'https://linkedin.com/in/gracehan',
    githubUrl: 'https://github.com/gracehan',
    instagramUrl: 'https://instagram.com/grace.codes',
    teamName: 'Creative Coders',
    position: 'Creative Coder',
    introductionText: '코드로 예술을 만들고 싶어요.',
  },
  {
    id: '8',
    name: 'Henry Lim',
    email: 'henry@example.com',
    linkedinUrl: 'https://linkedin.com/in/henrylim',
    githubUrl: 'https://github.com/henrylim',
    instagramUrl: 'https://instagram.com/henry.codes',
    teamName: 'Performance Gang',
    position: 'Frontend Performance Engineer',
    introductionText: '0.1초도 아끼는 게 제 목표입니다.',
  },
  {
    id: '9',
    name: 'Irene Seo',
    email: 'irene@example.com',
    linkedinUrl: 'https://linkedin.com/in/ireneseo',
    githubUrl: 'https://github.com/ireneseo',
    instagramUrl: 'https://instagram.com/irene.codes',
    teamName: 'Design Thinkers',
    position: 'Product Designer',
    introductionText: '문제를 해결하는 디자인을 추구해요.',
  },
  {
    id: '10',
    name: 'Jason Moon',
    email: 'jason@example.com',
    linkedinUrl: 'https://linkedin.com/in/jasonmoon',
    githubUrl: 'https://github.com/jasonmoon',
    instagramUrl: 'https://instagram.com/jason.codes',
    teamName: 'Growth Hackers',
    position: 'Growth Engineer',
    introductionText: '데이터 기반의 실험을 즐깁니다.',
  },
];
export default function ParticipantSection() {
  const [cards, setCards] = useState(mockShareCards);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const translateX = useRef(0);
  const dragging = useRef(false);

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

  return (
    <div className="wrapper flex h-full max-h-full flex-col overflow-hidden" ref={containerRef}>
      <h1 className="text-title-1 mb-5 mt-11 text-gray-50">삐약톤 캠퍼스 대항전</h1>
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-title-2 text-gray-300">행사 참여자</h2>
        <div className="text-label-2 rounded-lg border border-gray-700 bg-gray-900/60 px-2 py-1">
          <span className="text-orange-500">1</span>
          <span className="text-gray-500">/{mockShareCards.length}</span>
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
              {/* <span className="text-white">{card.id}</span> */}
              <ShareCard
                isReveal={parseInt(card.id || '0') % 2 == 0}
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

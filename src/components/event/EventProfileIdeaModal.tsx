import BottomModal from '@/components/common/BottomModal';

interface Tip {
  emoji: string;
  title: string;
  items: string[];
}

const tips: Tip[] = [
  {
    emoji: '🧑‍💻',
    title: '저는 이런 개발자예요',
    items: [
      '커피를 좋아하는',
      '문제 해결을 좋아하고 책임감 있게 일하는',
      '새로운 기술을 배우는 걸 즐기고 빠르게 적응하는',
    ],
  },
  {
    emoji: '🏆',
    title: '가장 뿌듯했던 경험',
    items: [
      '혼자서 사이드 프로젝트를 기획부터 배포까지 해냈을 때',
      '서비스 성능을 개선해 사용자 만족도를 높였을 때',
      '팀 프로젝트에서 리더를 맡아 성공적으로 마무리했을 때',
    ],
  },
  {
    emoji: '🧗‍♂️',
    title: '가장 힘들었던 경험',
    items: [
      '기한이 촉박한 프로젝트를 야근하면서 마무리했을 때',
      '문제를 해결하는 데 시간이 오래 걸렸을 때',
      '소통이 부족한 팀에서 갈등을 조율하며 일했을 때',
    ],
  },
];

interface IdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IdeaModal({ isOpen, onClose }: IdeaModalProps) {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModal.Title>무엇을 써야 할지 막막하다면? 🤔</BottomModal.Title>
      <BottomModal.Description>
        아래 내용을 참고해서 명함을 작성해도 좋아요!
      </BottomModal.Description>
      <BottomModal.Box>
        {tips.map((tip, idx) => (
          <TipSection key={idx} tip={tip} />
        ))}
      </BottomModal.Box>
      <BottomModal.Button onClick={onClose}>알겠습니다!</BottomModal.Button>
    </BottomModal>
  );
}

function TipSection({ tip }: { tip: Tip }) {
  return (
    <div className="pb-3">
      <p className="mb-1 text-sm font-medium leading-7 tracking-tight text-gray-800 dark:text-gray-300">
        <span className="mr-2">{tip.emoji}</span>
        {tip.title}
      </p>
      <ul className="text-sm leading-6 tracking-tight text-gray-500 dark:text-gray-300">
        {tip.items.map((item, i) => (
          <li key={i}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

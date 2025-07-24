import { useState } from 'react';

const tips = [
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
      '팀 프로젝트에서 리더 역할을 맡아 성공적으로 마무리했을 때',
    ],
  },
  {
    emoji: '🧗‍♂️',
    title: '가장 힘들었던 경험',
    items: [
      '기한이 촉박한 프로젝트를 야근하면서 마무리했을 때',
      '기술적으로 어려운 문제를 해결하는 데 시간이 오래 걸렸을 때',
      '소통이 부족한 팀에서 갈등을 조율하며 일했던 경험',
    ],
  },
];

export default function TipDropDown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-white px-5 py-4 text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-semibold">
          <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-500 dark:bg-blue-300/20 dark:text-blue-300"></span>
          <div
            className={`flex h-8 w-fit flex-col items-center justify-center rounded-lg bg-cyan-50 px-3 text-sm font-medium text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-300`}
          >
            TIP
          </div>
          <span>무엇을 써야 할지 막막하다면?</span>
        </p>
        <button
          className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? '닫기' : '보기'}
        </button>
      </div>

      <div
        className={`space-y-4 overflow-hidden pt-4 transition-all duration-300 ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {tips.map((tip, idx) => (
          <div className="pb-1" key={idx}>
            <p className="mb-1 text-sm font-medium leading-7 tracking-tight text-gray-800 dark:text-gray-300">
              <span className="mr-2">{tip.emoji}</span>
              {tip.title}
            </p>
            <ul className="text-sm leading-6 tracking-tight text-gray-500 dark:text-gray-300">
              {tip.items.map((item, i) => (
                <li className="" key={i}>
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

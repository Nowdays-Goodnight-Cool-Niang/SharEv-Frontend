import { useState } from 'react';

export default function TipDropDown() {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 text-sm leading-6 tracking-tight text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-semibold">
          <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-500">
            TIP
          </span>
          <span>무엇을 써야 할지 막막하다면?</span>
        </p>
        <button className="rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-700">
          {!open ? '보기' : '닫기'}
        </button>
      </div>
      <div
        className={`space-y-2 overflow-hidden transition-all duration-300 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-3 pb-1">
          <p className="mb-1 font-medium text-gray-600 dark:text-gray-200">
            <span className="mr-1">👤</span> <span>저는 이런 개발자예요</span>
          </p>
          <ul className="list-inside list-disc text-gray-500 dark:text-gray-300">
            <li>백엔드에 진심인 </li>
            <li>사용자 경험을 최우선으로 생각하는</li>
            <li>코드를 통해 문제 해결하는 걸 좋아하는</li>
          </ul>
        </div>

        <div className="pb-1">
          <p className="mb-1 font-medium text-gray-600 dark:text-gray-200">
            <span className="mr-1">🌟</span> <span>기억에 남는 순간</span>
          </p>
          <ul className="list-inside list-disc text-gray-500 dark:text-gray-300">
            <li>혼자 처음으로 프로젝트를 끝까지 완성해봤을 때</li>
            <li>서비스 성능을 눈에 띄게 개선했을 때</li>
            <li>처음으로 팀원에게 코드 리뷰를 받았던 순간</li>
          </ul>
        </div>

        <div className="pb-1">
          <p className="mb-1 font-medium text-gray-600 dark:text-gray-200">
            <span className="mr-1">🔁</span> <span>돌아가도 또 해보고 싶은 경험</span>
          </p>
          <ul className="list-inside list-disc text-gray-500 dark:text-gray-300">
            <li>밤새 팀원들과 프로젝트 완성했던 해커톤</li>
            <li>기획부터 런칭까지 직접 이끌었던 사이드 프로젝트</li>
            <li>모두가 열정적으로 몰입했던 협업 경험</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

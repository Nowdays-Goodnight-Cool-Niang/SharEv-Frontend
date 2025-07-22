import { useNavigate } from 'react-router';
import Header from '@/components/common/Header';
import { termOfServiceData } from '@/constants/termsOfServiceData';
import BaseButton from '@/components/common/BaseButton';
import { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  title: string;
}

function TermsSection({ title, children }: SectionProps) {
  return (
    <section className="rounded-xl bg-gray-50 px-5 pb-4 pt-6 text-sm leading-7 tracking-tight text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <h2 className="mb-2 text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TermsParagraph({ items }: { items: string[] }) {
  return (
    <div className="mb-3 space-y-2">
      {items.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </div>
  );
}

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="mb-3 ml-2 list-inside list-disc">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="background flex flex-col bg-white dark:bg-gray-950">
      <Header title="이용약관" />

      <div className="wrapper pb-14 pt-6">
        <div className="space-y-6">
          {termOfServiceData.map(({ title, contents }, idx) => (
            <TermsSection key={idx} title={`제${idx + 1}조 (${title})`}>
              {contents.map((block, i) => {
                if (block.type === 'paragraph') {
                  return <TermsParagraph key={i} items={block.items} />;
                }
                if (block.type === 'list') {
                  return <TermsList key={i} items={block.items} />;
                }
                return null;
              })}
            </TermsSection>
          ))}

          <div className="text-center">
            <ul className="mb-8 text-xs font-medium leading-5 tracking-tight text-gray-600 dark:text-gray-400">
              <li>약관 버전: v0.0.0</li>
              <li>공고일자: 2025.07.20</li>
              <li>시행일자: 2025.08.02</li>
            </ul>

            <BaseButton onClick={() => navigate(-1)}>홈으로 돌아가기</BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import UsersSvg from '@/assets/icons/ic_users.svg?react';
import { showCustomToast } from '@/utils/showToast';
import { useMutateCreateTeam } from '@/hooks/useMutateCreateTeam';
import { TEAM_TYPE_OPTIONS } from '@/types/domain/team';


const MAX_CONTENT_LENGTH = 500;

function TeamCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate: createTeam, isPending } = useMutateCreateTeam();

  const isValid = title.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid || isPending) return;

    createTeam(
      { title: title.trim() },
      {
        onSuccess: (data) => {
          showCustomToast({ message: '팀이 생성되었습니다.' });
          navigate(`/teams/${data.teamId}`);
        },
        onError: () => {
          showCustomToast({ message: '팀 생성에 실패했습니다. 다시 시도해주세요.' });
        },
      },
    );
  };

  return (
    <div className="background flex min-h-full flex-col bg-gray-50">
      <Header showBackButton />

      <div className="wrapper flex-1 py-2">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">새 팀 만들기</h2>
          <p className="mt-1 text-sm text-gray-500">
            팀을 만들고 멤버들과 함께 행사를 운영하세요.
          </p>
        </div>

        {/* 섹션 1: 기본 정보 */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5">
          <SectionTitle step={1} title="기본 정보" />

          <div className="mb-5">
            <FieldLabel
              icon={<UsersSvg width={16} height={16} className="text-gray-500" />}
              label="팀명"
              required
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: GDC Campus Korea"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              팀을 대표할 수 있는 명확한 이름을 입력하세요.
            </p>
          </div>

          <div>
            <FieldLabel
              icon={
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="14" y2="17" />
                </svg>
              }
              label="팀 소개"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={MAX_CONTENT_LENGTH}
              rows={4}
              placeholder="팀의 목적과 활동에 대해 설명해주세요..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-xs text-gray-400">팀원들에게 팀의 목적과 활동을 알려주세요.</p>
              <span className="text-xs text-gray-400">
                {content.length} / {MAX_CONTENT_LENGTH}
              </span>
            </div>
          </div>
        </section>

        {/* 섹션 2: 팀 타입 안내 */}
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5">
          <SectionTitle step={2} title="팀 타입 안내" />

          <div className="space-y-2">
            {Object.entries(TEAM_TYPE_OPTIONS).map(([key, { label, description }]) => (
              <div
                key={key}
                className={`rounded-xl border px-4 py-3 ${
                  key === 'NONE'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${key === 'NONE' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {label}
                  </p>
                  {key === 'NONE' && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                      기본
                    </span>
                  )}
                </div>
                <p className={`mt-0.5 text-xs ${key === 'NONE' ? 'text-blue-400' : 'text-gray-400'}`}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-400">
            팀은 일반 팀으로 생성되며, 공식 팀 전환은 서비스 관리자에게 문의해주세요.
          </p>
        </section>
      </div>

      {/* 하단 버튼 */}
      <div className="wrapper sticky bottom-0 flex gap-3 border-t border-gray-100 bg-white py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 active:bg-gray-50"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isPending}
          className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isPending ? '생성 중...' : '팀 생성'}
        </button>
      </div>
      <BottomSpace />
    </div>
  );
}

function SectionTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
        {step}
      </span>
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
    </div>
  );
}

function FieldLabel({
  icon,
  label,
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
      {icon}
      <span>{label}</span>
      {required && <span className="text-blue-500">*</span>}
    </div>
  );
}

export default TeamCreate;

import { useState, useEffect } from 'react';
import BottomModal from '@/components/common/BottomModal';
import type { TeamDetail, TeamType } from '@/types/domain/team';

interface TeamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamDetail;
  onSave: (data: { title: string; content: string; teamType: TeamType }) => void;
  isPending: boolean;
}

const MAX_CONTENT_LENGTH = 500;

const TEAM_TYPE_OPTIONS: { value: TeamType; label: string; description: string }[] = [
  { value: 'NONE', label: '일반 팀', description: '팀 내부 행사만 생성 가능' },
  { value: 'CERTIFICATED', label: '공식 팀', description: '공개 행사를 생성할 수 있어요' },
];

function TeamEditModal({ isOpen, onClose, team, onSave, isPending }: TeamEditModalProps) {
  const [title, setTitle] = useState(team.title);
  const [content, setContent] = useState(team.content);
  const [teamType, setTeamType] = useState<TeamType>(team.teamType);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(team.title);
      setContent(team.content);
      setTeamType(team.teamType);
      setIsTypeOpen(false);
    }
  }, [isOpen, team.title, team.content, team.teamType]);

  const isValid = title.trim().length > 0;
  const hasChanges =
    title.trim() !== team.title || content !== team.content || teamType !== team.teamType;
  const selectedType = TEAM_TYPE_OPTIONS.find((opt) => opt.value === teamType)!;

  const handleSave = () => {
    if (!isValid || !hasChanges || isPending) return;
    onSave({ title: title.trim(), content, teamType });
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModal.Header>
        <BottomModal.Title>팀 정보 수정</BottomModal.Title>
      </BottomModal.Header>

      <BottomModal.Body>
        {/* 팀명 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            팀명 <span className="text-blue-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="팀명을 입력하세요"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* 팀 소개 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">팀 소개</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_CONTENT_LENGTH}
            rows={4}
            placeholder="팀의 목적과 활동에 대해 설명해주세요..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
          <div className="mt-1 text-right text-xs text-gray-400">
            {content.length} / {MAX_CONTENT_LENGTH}
          </div>
        </div>

        {/* 팀 타입 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">팀 타입</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTypeOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedType.label}</p>
                <p className="text-xs text-gray-400">{selectedType.description}</p>
              </div>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 text-gray-400 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isTypeOpen && (
              <ul className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {TEAM_TYPE_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setTeamType(option.value);
                        setIsTypeOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 ${teamType === option.value ? 'bg-blue-50' : ''}`}
                    >
                      <p className="text-sm font-medium text-gray-900">{option.label}</p>
                      <p className="text-xs text-gray-400">{option.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </BottomModal.Body>

      <BottomModal.Footer>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 active:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid || !hasChanges || isPending}
            className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isPending ? '저장 중...' : '저장'}
          </button>
        </div>
      </BottomModal.Footer>
    </BottomModal>
  );
}

export default TeamEditModal;

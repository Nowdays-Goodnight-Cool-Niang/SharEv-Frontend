import { useState, useEffect } from 'react';
import BottomModal from '@/components/common/BottomModal';
import { TEAM_TYPE_OPTIONS } from '@/types/domain/team';
import type { TeamDetail } from '@/types/domain/team';

interface TeamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamDetail;
  onSave: (data: { title: string; content: string }) => void;
  isPending: boolean;
}

const MAX_CONTENT_LENGTH = 500;


function TeamEditModal({ isOpen, onClose, team, onSave, isPending }: TeamEditModalProps) {
  const [title, setTitle] = useState(team.title);
  const [content, setContent] = useState(team.content);

  useEffect(() => {
    if (isOpen) {
      setTitle(team.title);
      setContent(team.content);
    }
  }, [isOpen, team.title, team.content]);

  const isValid = title.trim().length > 0;
  const hasChanges = title.trim() !== team.title || content !== team.content;

  const handleSave = () => {
    if (!isValid || !hasChanges || isPending) return;
    onSave({ title: title.trim(), content });
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

        {/* 팀 타입 (읽기 전용) */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">팀 타입</label>
          <div className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-500">
              {TEAM_TYPE_OPTIONS[team.certification].label}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {TEAM_TYPE_OPTIONS[team.certification].description}
            </p>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            팀 타입 변경은 서비스 관리자에게 문의해주세요.
          </p>
        </div>

        {/* 팀 소개 */}
        <div>
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

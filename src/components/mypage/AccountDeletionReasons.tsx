interface AccountDeletionReasonsProps {
  selectedReason: string;
  customReason: string;
  onReasonChange: (reason: string) => void;
  onCustomReasonChange: (reason: string) => void;
}

const DELETION_REASONS = [
  '사용하기 불편해요',
  '다른 서비스를 이용해요',
  '새 계정을 만들고 싶어요',
  '사용 빈도가 낮아요',
  '직접 입력할래요',
];

function AccountDeletionReasons({
  selectedReason,
  customReason,
  onReasonChange,
  onCustomReasonChange,
}: AccountDeletionReasonsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-title-3 mb-2 font-medium text-gray-300">탈퇴 사유</h3>
      <p className="text-body-3 mb-4 font-light text-gray-300">
        서비스 개선에 적극적으로 반영하도록 하겠습니다.
      </p>
      <div className="space-y-3">
        {DELETION_REASONS.map((reason) => (
          <label
            key={reason}
            className="flex cursor-pointer items-center rounded p-2 transition-colors hover:bg-gray-800/50"
          >
            <input
              type="radio"
              name="deletionReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="mr-3 h-4 w-4 border-gray-600 bg-gray-700 accent-orange-500 focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-body-3 text-gray-200">{reason}</span>
          </label>
        ))}
      </div>

      {selectedReason === '직접 입력할래요' && (
        <div className="mt-3">
          <textarea
            value={customReason}
            onChange={(e) => onCustomReasonChange(e.target.value)}
            placeholder="탈퇴 사유를 입력해주세요."
            maxLength={200}
            className="text-body-3 h-16 w-full resize-none rounded-lg border border-gray-600 bg-gray-700 p-3 text-gray-100 placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <div className="mt-1 text-right">
            <span className="text-label-2 text-gray-500">{customReason.length}/200</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountDeletionReasons;

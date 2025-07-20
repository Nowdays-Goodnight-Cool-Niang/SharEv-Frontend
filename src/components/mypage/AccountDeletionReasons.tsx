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
    <div>
      <h3 className="text-title-3 mb-0.5 font-medium text-gray-800">탈퇴 사유</h3>
      <p className="text-body-3 mb-2 font-light text-gray-700">
        서비스 개선에 적극적으로 반영하겠습니다.
      </p>
      <div>
        {DELETION_REASONS.map((reason) => (
          <label
            key={reason}
            className="flex cursor-pointer items-center rounded p-2 transition-colors hover:bg-gray-50"
          >
            <input
              type="radio"
              name="deletionReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="mr-3 h-4 w-4 border-gray-200 bg-white accent-orange-500 focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-body-3 text-gray-700">{reason}</span>
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
            className="text-body-3 h-16 w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-gray-700 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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

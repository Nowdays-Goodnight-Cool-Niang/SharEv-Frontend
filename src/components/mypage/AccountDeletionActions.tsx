interface AccountDeletionActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
  isDisabled: boolean;
}

function AccountDeletionActions({
  onCancel,
  onConfirm,
  isPending,
  isDisabled,
}: AccountDeletionActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        disabled={isPending}
        className="text-button-2 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        취소
      </button>
      <button
        onClick={onConfirm}
        disabled={isDisabled || isPending}
        className="text-button-2 flex-1 rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
      >
        {isPending ? '처리 중...' : '탈퇴하기'}
      </button>
    </div>
  );
}

export default AccountDeletionActions;

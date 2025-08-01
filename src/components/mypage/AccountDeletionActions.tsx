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
        className="h-14 w-full min-w-24 flex-1 rounded-2xl bg-gray-200 font-semibold tracking-tight text-gray-400 transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        취소
      </button>
      <button
        onClick={onConfirm}
        disabled={isDisabled || isPending}
        className="flex-2 h-14 w-full rounded-2xl bg-blue-500 font-semibold tracking-tight text-white transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        {isPending ? '처리 중...' : '탈퇴하기'}
      </button>
    </div>
  );
}

export default AccountDeletionActions;

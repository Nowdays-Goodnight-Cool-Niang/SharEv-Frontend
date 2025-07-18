interface AccountDeletionAgreementProps {
  isAgreed: boolean;
  onAgreementChange: (agreed: boolean) => void;
}

function AccountDeletionAgreement({ isAgreed, onAgreementChange }: AccountDeletionAgreementProps) {
  return (
    <div className="mb-6">
      <label className="flex cursor-pointer items-center justify-end rounded p-2 transition-colors hover:bg-gray-800/50">
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(e) => onAgreementChange(e.target.checked)}
          className="mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 accent-orange-500 focus:ring-2 focus:ring-orange-500"
        />
        <span className="text-body-3 text-gray-200">
          위 유의사항을 모두 확인하였으며 동의합니다.
        </span>
      </label>
    </div>
  );
}

export default AccountDeletionAgreement;

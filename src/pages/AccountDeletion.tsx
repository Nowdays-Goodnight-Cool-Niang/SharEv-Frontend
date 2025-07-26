import Header from '@/components/common/Header';
import AccountDeletionWarning from '@/components/mypage/AccountDeletionWarning';
import AccountDeletionAgreement from '@/components/mypage/AccountDeletionAgreement';
import AccountDeletionReasons from '@/components/mypage/AccountDeletionReasons';
import AccountDeletionActions from '@/components/mypage/AccountDeletionActions';
import { useAccountDeletion } from '@/hooks/useAccountDeletion';

function AccountDeletion() {
  const {
    selectedReason,
    customReason,
    isAgreed,
    isPending,
    isFormValid,
    handleConfirm,
    handleCancel,
    handleReasonChange,
    handleCustomReasonChange,
    handleAgreementChange,
  } = useAccountDeletion();

  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="회원 탈퇴" showBackButton />
      <div className="wrapper pb-6">
        <div className="mt-4 space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <AccountDeletionWarning />
            <div className="mt-6">
              <AccountDeletionAgreement
                isAgreed={isAgreed}
                onAgreementChange={handleAgreementChange}
              />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <AccountDeletionReasons
              selectedReason={selectedReason}
              customReason={customReason}
              onReasonChange={handleReasonChange}
              onCustomReasonChange={handleCustomReasonChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <AccountDeletionActions
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            isPending={isPending}
            isDisabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountDeletion;

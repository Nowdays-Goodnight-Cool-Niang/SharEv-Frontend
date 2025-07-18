import FormHeader from '@/components/profile/FormHeader';
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
    <main className="wrapper pt-11">
      <FormHeader content="회원 탈퇴" />

      <div className="mt-6">
        <AccountDeletionWarning />

        <AccountDeletionAgreement isAgreed={isAgreed} onAgreementChange={handleAgreementChange} />

        <AccountDeletionReasons
          selectedReason={selectedReason}
          customReason={customReason}
          onReasonChange={handleReasonChange}
          onCustomReasonChange={handleCustomReasonChange}
        />

        <AccountDeletionActions
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isPending={isPending}
          isDisabled={!isFormValid}
        />
      </div>
    </main>
  );
}

export default AccountDeletion;

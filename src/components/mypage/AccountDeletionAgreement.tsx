import Checkbox from '@/components/common/Checkbox';

interface AccountDeletionAgreementProps {
  isAgreed: boolean;
  onAgreementChange: (agreed: boolean) => void;
}

function AccountDeletionAgreement({ isAgreed, onAgreementChange }: AccountDeletionAgreementProps) {
  return (
    <div className="flex justify-end">
      <Checkbox checked={isAgreed} onChange={() => onAgreementChange(!isAgreed)}>
        위 유의사항을 모두 확인하였으며 동의합니다.
      </Checkbox>
    </div>
  );
}

export default AccountDeletionAgreement;

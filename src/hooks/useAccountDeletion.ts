import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { accountAPI } from '@/apis/accounts';
import { TOAST_MESSAGE } from '@/utils/labels';

export function useAccountDeletion() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const { mutate: performAccountDeletion, isPending } = useMutation({
    mutationFn: accountAPI.deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast.success(TOAST_MESSAGE.ACCOUNT_DELETION_SUCCESS, { icon: '🙇🏻‍♀️' });
    },
    onError: (error) => {
      console.error('Account deletion error:', error.message);
      toast.error('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleConfirm = () => {
    const finalConfirm = window.confirm(
      '정말로 탈퇴하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.'
    );

    if (finalConfirm) {
      performAccountDeletion();
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
    if (reason !== '직접 입력할래요') {
      setCustomReason('');
    }
  };

  const handleCustomReasonChange = (reason: string) => {
    setCustomReason(reason);
  };

  const handleAgreementChange = (agreed: boolean) => {
    setIsAgreed(agreed);
  };

  const isFormValid =
    selectedReason && isAgreed && (selectedReason !== '직접 입력할래요' || customReason.trim());

  return {
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
  };
}

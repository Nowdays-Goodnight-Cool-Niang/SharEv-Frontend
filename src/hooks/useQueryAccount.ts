import { useQuery } from '@tanstack/react-query';
import { accountAPI } from '../apis/accounts';
import { IProfile } from '../types';

export const useQueryAccount = () => {
  const {
    data: account,
    isLoading,
    error,
  } = useQuery<IProfile>({
    queryKey: ['account'],
    queryFn: accountAPI.getProfile,
  });
  return {
    account,
    isLoading,
    error,
  };
};

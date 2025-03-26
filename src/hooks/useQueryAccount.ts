import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '../apis/accounts';
import { IProfile } from '../types';

export const useQueryAccount = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<IProfile>({
    queryKey: ['account'],
    queryFn: accountAPI.getProfile,
  });

  const mutation = useMutation({ mutationFn: accountAPI.patchProfileInfo });

  return {
    profile,
    isLoading,
    error,
    patchProfileInfo: mutation.mutate,
  };
};

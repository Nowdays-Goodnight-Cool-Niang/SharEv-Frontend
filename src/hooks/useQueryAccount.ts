import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '@/apis/accounts';
import { IAccountApiResponse, IAccount } from '@/types/domain/account';

export const useQueryAccount = () => {
  const {
    data: rawProfile,
    isLoading,
    error,
  } = useQuery<IAccountApiResponse>({
    queryKey: ['account'],
    queryFn: accountAPI.getProfile,
  });

  const profile = rawProfile
    ? ({
        id: rawProfile.id,
        name: rawProfile.name ?? '',
        email: rawProfile.email ?? '',
        socialLinks: {
          githubUrl: rawProfile.githubUrl ?? '',
          linkedinUrl: rawProfile.linkedinUrl ?? '',
          instagramUrl: rawProfile.instagramUrl ?? '',
        },
      } as IAccount)
    : undefined;

  const mutation = useMutation({
    mutationFn: accountAPI.patchProfileInfo,
  });

  return {
    profile,
    isLoading,
    error,
    patchProfileInfo: mutation.mutate,
  };
};

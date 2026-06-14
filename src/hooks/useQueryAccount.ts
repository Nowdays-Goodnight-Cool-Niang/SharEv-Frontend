import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '@/apis/accounts';
import { IAccountApiResponse, IAccount, ILink } from '@/types/domain/account';

export const useQueryAccount = () => {
  const {
    data: rawProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<IAccountApiResponse>({
    queryKey: ['account'],
    queryFn: accountAPI.getProfile,
  });

  const {
    data: links,
    isLoading: isLinksLoading,
    error: linksError,
  } = useQuery<ILink[]>({
    queryKey: ['accountLinks'],
    queryFn: accountAPI.getLinks,
  });

  const profile =
    rawProfile && links
      ? ({
          id: rawProfile.id,
          name: rawProfile.name ?? '',
          email: rawProfile.email ?? '',
          linkUrls: links.map((link) => link.url),
        } as IAccount)
      : undefined;

  const mutation = useMutation({
    mutationFn: accountAPI.patchProfileInfo,
  });

  return {
    profile,
    links: links ?? [],
    isLoading: isProfileLoading || isLinksLoading,
    error: profileError || linksError,
    patchProfileInfo: mutation.mutate,
  };
};

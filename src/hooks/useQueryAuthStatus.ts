import { accountAPI } from '@/apis/accounts';
import { useQuery } from '@tanstack/react-query';

export function useQueryAuthStatus() {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: accountAPI.checkAuthenticated,
  });
}

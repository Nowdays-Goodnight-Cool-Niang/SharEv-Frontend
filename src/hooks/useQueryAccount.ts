import { useQuery } from "@tanstack/react-query";
import { accountAPI } from "../apis/accounts";
import { IAccount } from "../types";

export const useQueryAccount = () => {
  const {
    data: account,
    isLoading,
    error,
  } = useQuery<IAccount>({
    queryKey: ["account"],
    queryFn: accountAPI.getAccount,
  });
  return {
    account,
    isLoading,
    error,
  };
};

import { useQuery } from "@tanstack/react-query";
import { accountAPI } from "../apis/accounts";
import { IAccount } from "../types";

export const useQueryAccount = (formAccount:IFormAccount) =>  useMutation({mutationFn:() => accountAPI.patchParticipantInfo(formAccount)});


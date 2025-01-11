import { useMutation } from '@tanstack/react-query';
import { accountAPI } from '../apis/accounts';
import { IFormAccount } from '../types/formAccount';

export const useQueryAccount = (formAccount:IFormAccount) =>  useMutation({mutationFn:() => accountAPI.patchParticipantInfo(formAccount)});


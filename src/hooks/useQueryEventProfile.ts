// @ts-nocheck
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { participantAPI } from '../apis/participants';
import { IEventProfile } from '../types';

export const useQueryEventProfile = (participantId?: string) => {
    // const queryClient = useQueryClient();
  
    const {
      data: eventProfile,
      isLoading,
      error,
    } = useQuery<IEventProfile>({
      queryKey: ['eventProfile', participantId],
      queryFn: () => participantAPI.getParticipantInfo(participantId!), // Pass participantId dynamically
    });
  
    const createEventProfileMutation = useMutation({
      mutationFn: (eventProfile: IEventProfile) => participantAPI.putParticipantInfo(eventProfile),
    });
  
    return {
      eventProfile,
      isLoading,
      error,
      createEventProfile: createEventProfileMutation.mutate,
      createEventProfileAsync: createEventProfileMutation.mutateAsync, // Optional async version
    };
  };
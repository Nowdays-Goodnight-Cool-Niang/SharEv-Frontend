import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EVENT_ID } from '@/constants/eventId';
import { eventAPI } from '@/apis/event/event.api';
import { EventProfileDetailRequest } from '@/types/api.types';

export const useMutateMyEventProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EventProfileDetailRequest) => eventAPI.updateMyProfile(EVENT_ID, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventProfile', EVENT_ID, 'mine'] });
    },
  });
};

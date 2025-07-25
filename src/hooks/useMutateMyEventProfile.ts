import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EVENT_ID } from '@/constants/eventId';
import { eventAPI } from '@/apis/event/event.api';
import { ProfileContent } from '@/types/api/event';

export const useMutateMyEventProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileContent) => eventAPI.updateMyProfile(EVENT_ID, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventProfile', EVENT_ID, 'my'] });
    },
  });
};

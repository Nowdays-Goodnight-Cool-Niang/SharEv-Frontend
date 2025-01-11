import { useQuery } from "@tanstack/react-query";
import { eventAPI } from "../apis/events";
import { IEventDetail } from "../types";

export const useQueryEvent = (eventId: string) => {
  const {
    data: event,
    isLoading,
    error,
  } = useQuery<IEventDetail>({
    queryKey: ["event", eventId],
    queryFn: () => eventAPI.getEventById(eventId),
  });

  return {
    event,
    isLoading,
    error,
  };
};

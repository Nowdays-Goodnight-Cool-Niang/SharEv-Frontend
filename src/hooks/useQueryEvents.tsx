import { useQuery } from "@tanstack/react-query";
import { eventAPI } from "../apis/events";
import { IEvent } from "../types";

export const useQueryEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<IEvent[]>({ queryKey: ["events"], queryFn: eventAPI.getEvents });

  return {
    events,
    isLoading,
    error,
  };
};

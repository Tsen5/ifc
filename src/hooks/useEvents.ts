import { useQuery } from '@tanstack/react-query';

export interface UseEventsProps {
  month: number;
  day: number;
}

export interface WikipediaEvent {
  year: number;
  text: string;
  pages: unknown[];
}

export function useEvents({ month, day }: UseEventsProps) {
  return useQuery({
    queryKey: ['events', month, day],
    queryFn: async (): Promise<Array<WikipediaEvent>> => {
      const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
      return (await response.json()).events ?? [];
    },
  });
}

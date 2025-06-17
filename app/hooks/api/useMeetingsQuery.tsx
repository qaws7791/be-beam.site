import { getMeetingList } from '@/api/meetings';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useMeetingsQuery(
  search: string,
  selectedTopic: string,
  selectedFilters: Record<string, string>,
) {
  return useSuspenseQuery({
    queryKey: ['meetings', search, selectedTopic, selectedFilters],
    queryFn: () => getMeetingList(search, selectedTopic, selectedFilters),
    staleTime: 1000 * 60 * 5,
  });
}

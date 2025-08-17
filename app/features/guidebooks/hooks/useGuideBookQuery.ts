import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getGuideBookDetail } from '@/shared/api/endpoints/guideBooks';

export const guideBookQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['guideBook', id],
    queryFn: () => getGuideBookDetail(id),
  });

export default function useGuideBookQuery(id: number) {
  return useSuspenseQuery(guideBookQueryOptions(id));
}

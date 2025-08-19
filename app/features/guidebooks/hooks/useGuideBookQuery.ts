import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getGuideBookDetail } from '@/shared/api/endpoints/guideBooks';
import { guideBookQueryKeys } from '@/features/guidebooks/queries/queryKeys';

export const guideBookQueryOptions = (id: number) =>
  queryOptions({
    queryKey: guideBookQueryKeys.detail(id).queryKey,
    queryFn: () => getGuideBookDetail(id),
  });

export default function useGuideBookQuery(id: number) {
  return useSuspenseQuery(guideBookQueryOptions(id));
}

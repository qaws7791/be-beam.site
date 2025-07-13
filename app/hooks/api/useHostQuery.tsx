import { getHostDetail } from '@/api/hosts';
import { useQuery } from '@tanstack/react-query';

export default function useHostQuery(id: number) {
  return useQuery({
    queryKey: ['hostDetail', id],
    queryFn: () => getHostDetail(id),
  });
}

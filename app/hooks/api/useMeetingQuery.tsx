import { getMeetingDetail } from '@/api/meetings';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingQuery(id: number) {
  return useQuery({
    queryKey: ['meeting', id],
    queryFn: () => getMeetingDetail(id),
  });
}

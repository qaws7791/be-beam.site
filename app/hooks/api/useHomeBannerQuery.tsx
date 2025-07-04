import { useQuery } from '@tanstack/react-query';
import { getHomeBanners } from '@/api/home';

export default function useHomeBannerQuery() {
  return useQuery({
    queryKey: ['banner'],
    queryFn: () => getHomeBanners(),
  });
}

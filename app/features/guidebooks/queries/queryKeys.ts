import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const guideBookQueryKeys = createQueryKeys('guideBooks', {
  list: (filters: GuideBookListFilters) => [filters],
  detail: (id: number) => [id],
});

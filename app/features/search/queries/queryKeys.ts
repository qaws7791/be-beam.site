import type {
  SearchGuidebookParams,
  SearchHostParams,
  SearchMeetingParams,
  SearchTotalParams,
} from '@/shared/api/endpoints/searches';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const searchQueryKeys = createQueryKeys('search', {
  total: (params: SearchTotalParams) => [params],
  guidebooks: (params: SearchGuidebookParams) => [params],
  meetings: (params: SearchMeetingParams) => [params],
  hosts: (params: SearchHostParams) => [params],
});

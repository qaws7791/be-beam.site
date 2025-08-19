import type { MyHostLikesParams } from '@/shared/api/endpoints/users';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const userQueryKeys = createQueryKeys('users', {
  host: (id: number) => [id],
  likedHosts: (params: MyHostLikesParams) => [params],
  myInfo: null,
  myProfile: null,
});

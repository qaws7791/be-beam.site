import type { NotificationParams } from '@/shared/api/endpoints/notifications';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const notificationQueryKeys = createQueryKeys('notifications', {
  list: (params: NotificationParams) => [params],
});

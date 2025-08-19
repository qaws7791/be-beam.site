import { notificationQueryKeys } from '@/features/notifications/queries/queryKeys';
import {
  getNotifications,
  type NotificationParams,
} from '@/shared/api/endpoints/notifications';
import { queryOptions, useQuery } from '@tanstack/react-query';

const myNotificationsQueryOptions = ({
  type,
  page,
  size,
}: NotificationParams) =>
  queryOptions({
    queryKey: notificationQueryKeys.list({ type, page, size }).queryKey,
    queryFn: () => getNotifications({ type, page, size }),
  });

export default function useMyNotificationsQuery({
  type = 'all',
  page = 1,
  size = 10,
}: {
  type?: 'all' | 'meeting' | 'review' | 'host';
  page?: number;
  size?: number;
} = {}) {
  return useQuery(myNotificationsQueryOptions({ type, page, size }));
}

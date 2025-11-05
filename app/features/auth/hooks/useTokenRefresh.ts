import { useEffect } from 'react';
import { reissueToken } from '@/shared/api/endpoints/auth';
import useUserSession from '@/features/users/hooks/useUserSession';

export const useTokenRefresh = (intervalMs: number) => {
  const { user } = useUserSession();
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const refreshInterval = setInterval(async () => {
      try {
        console.log('Token refresh interval');
        if (user) {
          console.log(
            'User found, refreshing token',
            new Date().toTimeString(),
          );
          await reissueToken();
          console.log(
            'Token refreshed successfully',
            new Date().toTimeString(),
          );
        }
      } catch (error) {
        console.warn('Token refresh failed:', error);
      }
    }, intervalMs);

    return () => clearInterval(refreshInterval);
  }, [intervalMs, user]);
};

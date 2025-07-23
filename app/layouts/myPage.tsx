import { Outlet } from 'react-router';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';
import useUserSession from '@/hooks/business/useUserSession';
import { requireAuthMiddleware } from '@/middlewares/auth';

export const unstable_middleware = [requireAuthMiddleware];

export default function MyPage() {
  const { user } = useUserSession();

  return (
    <>
      {user && (
        <MyPageTemplate>
          <SideBar user={user} />
          <Outlet />
        </MyPageTemplate>
      )}
    </>
  );
}

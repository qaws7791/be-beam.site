import { Outlet } from 'react-router';
import useUserSession from '@/hooks/business/useUserSession';
import { requireAuthMiddleware } from '@/middlewares/auth';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';

export const unstable_middleware = [requireAuthMiddleware];

export default function MyPage() {
  const { user } = useUserSession();

  return (
    <MyPageTemplate>
      {!user ? (
        <p>유저가 존재하지 않습니다.</p>
      ) : (
        <>
          <SideBar user={user} />
          <Outlet />
        </>
      )}
    </MyPageTemplate>
  );
}

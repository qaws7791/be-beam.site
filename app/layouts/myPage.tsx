import { Outlet, useRouteLoaderData } from 'react-router';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';

export default function MyPage() {
  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;

  return (
    <MyPageTemplate>
      <SideBar user={user} />
      <Outlet />
    </MyPageTemplate>
  );
}

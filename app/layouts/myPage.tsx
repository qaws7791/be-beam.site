import { Outlet } from 'react-router';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';
import useMyProfileQuery from '@/hooks/api/useMyProfileQuery';

export default function MyPage() {
  const myProfile = useMyProfileQuery();
  console.log(myProfile.data);

  return (
    <>
      {myProfile.data && (
        <MyPageTemplate>
          <SideBar user={myProfile.data} />
          <Outlet />
        </MyPageTemplate>
      )}
    </>
  );
}

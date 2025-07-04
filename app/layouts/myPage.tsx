import { Outlet } from 'react-router';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';

export default function MyPage() {
  const user = {
    nickName: '비빔 관리자',
    profileImg:
      'https://i.pinimg.com/736x/83/1a/0b/831a0b369f389fdd93d072203287043e.jpg',
  };

  return (
    <MyPageTemplate>
      <SideBar user={user} />
      <Outlet />
    </MyPageTemplate>
  );
}

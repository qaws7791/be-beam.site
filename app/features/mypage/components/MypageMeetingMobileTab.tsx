import { TabNav, TabNavLink } from '@/shared/components/ui/TabNav';

interface MypageMeetingMobileTabProps {
  selectedTab: 'participated' | 'requested' | 'created';
}

export default function MypageMeetingMobileTab({
  selectedTab,
}: MypageMeetingMobileTabProps) {
  return (
    <TabNav className="w-full overflow-x-auto md:hidden">
      <TabNavLink
        to="/myPage/participated"
        isActive={selectedTab === 'participated'}
      >
        참여 모임
      </TabNavLink>
      <TabNavLink to="/myPage/requested" isActive={selectedTab === 'requested'}>
        신청 모임
      </TabNavLink>
      <TabNavLink to="/myPage/created" isActive={selectedTab === 'created'}>
        내가 개설한 모임
      </TabNavLink>
    </TabNav>
  );
}

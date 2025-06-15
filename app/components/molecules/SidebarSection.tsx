import SidebarSubNavItem from '../atoms/SidebarSubNavItem';
import Text from '../atoms/text/Text';
import type { SideBarSectionItems } from '@/types/components';

export default function SidebarSection({
  title,
  isActive,
  items,
}: {
  title: string;
  isActive: boolean;
  items: SideBarSectionItems[];
}) {
  return (
    <div className="mb-3">
      <button className="flex w-full items-center gap-2 px-5 py-4">
        <Text variant="T3_Semibold" color={isActive ? 'primary' : 'black'}>
          {title}
        </Text>
      </button>

      {items.map((item, idx) => (
        <SidebarSubNavItem
          key={idx}
          to={item.to}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

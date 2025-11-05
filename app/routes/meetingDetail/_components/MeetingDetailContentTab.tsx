import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import { cn } from '@/styles/tailwind';

interface MeetingDetailContentTabProps {
  tab: string;
  scrollToSection: (value: string) => void;
  isFixed: boolean;
  fixedTabStyle: { width: string; left: string };
}

export default function MeetingDetailContentTab({
  tab,
  scrollToSection,
  isFixed,
  fixedTabStyle,
}: MeetingDetailContentTabProps) {
  const tabList = [
    { label: '모임 소개', value: 'intro' },
    { label: '모임 일정', value: 'schedule' },
    { label: '공지사항', value: 'notice' },
    { label: '모임 후기', value: 'review' },
  ];

  return (
    <Tabs
      value={tab}
      onValueChange={scrollToSection}
      className={cn(
        isFixed ? 'fixed top-[72px] right-0 z-10 bg-white lg:top-[100px]' : '',
        'w-full py-1 text-t2',
      )}
      style={isFixed ? { ...fixedTabStyle } : {}}
    >
      <div className="relative w-full text-t2">
        <TabsList className="grid w-full grid-cols-4">
          {tabList.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-primary after:transition-all after:duration-300 after:content-[''] data-[state=active]:text-primary data-[state=active]:after:scale-x-100 data-[state=active]:after:bg-primary"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gray-300" />
      </div>
    </Tabs>
  );
}

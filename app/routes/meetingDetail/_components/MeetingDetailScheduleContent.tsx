import { useState, type RefObject } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import TitleAndDes from '../../../shared/components/common/TitleAndDes';
import LocationIcon from '@/shared/components/icons/LocationIcon';
import ClockIcon from '@/shared/components/icons/ClockIcon';
import type { MeetingSchedule } from '@/shared/types/entities';

export type GroupedScheduleItem = {
  dateLabel: string;
  dateKey: string;
  schedules: MeetingSchedule[];
};

type ScheduleGroupMapType = Map<string, GroupedScheduleItem>;

interface MeetingDetailScheduleContentProps {
  schedules: MeetingSchedule[];
  sectionRefs: RefObject<Record<string, HTMLDivElement | null>>;
}

export default function MeetingDetailScheduleContent({
  schedules,
  sectionRefs,
}: MeetingDetailScheduleContentProps) {
  function groupSchedulesByDate(
    schedules: MeetingSchedule[],
  ): GroupedScheduleItem[] {
    if (!schedules || schedules.length === 0) {
      return [];
    }

    const ScheduleGroupMap = schedules.reduce(
      (acc: ScheduleGroupMapType, schedule) => {
        const startTime = new Date(schedule.meetingStartTime);

        const dateKey = startTime.toISOString().slice(0, 10);

        const dateLabel = new Intl.DateTimeFormat('ko-KR', {
          month: 'long',
          day: 'numeric',
        }).format(startTime);

        if (!acc.has(dateKey)) {
          acc.set(dateKey, {
            dateLabel: dateLabel,
            dateKey: dateKey,
            schedules: [],
          });
        }

        acc.get(dateKey)!.schedules.push(schedule);
        return acc;
      },
      new Map<string, GroupedScheduleItem>(),
    );

    return Array.from(ScheduleGroupMap.values());
  }
  const groupData = groupSchedulesByDate(schedules);

  const [tab, setTab] = useState(groupData[0].dateKey);
  return (
    <TitleAndDes
      title="모임 일정"
      wrapStyle="py-10"
      ref={(el) => {
        sectionRefs.current['schedule'] = el;
      }}
    >
      <div>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value)}
          className="w-full text-t2"
        >
          <TabsList className="w-full overflow-x-auto before:h-0">
            {groupData.map((schedule) => (
              <TabsTrigger
                key={schedule.dateKey}
                value={schedule.dateKey}
                className="mr-4 cursor-pointer rounded-full bg-gray-400 px-5 py-3 text-b1 transition-all duration-300 after:h-0 hover:bg-black hover:text-white data-[state=active]:bg-black data-[state=active]:text-white"
              >
                {schedule.dateLabel}
              </TabsTrigger>
            ))}
          </TabsList>

          {groupData.map((schedule) => (
            <TabsContent
              key={schedule.dateKey}
              value={schedule.dateKey}
              className="mt-5 grid w-full gap-5 xl:grid-cols-3"
            >
              {schedule.schedules.map((schedule, idx) => (
                <li
                  className="box-border list-none rounded-3xl border-1 border-gray-400 p-5 text-b3 transition-all duration-700 hover:bg-gray-100"
                  key={idx}
                >
                  <h1 className="text-t2">{idx + 1}회차</h1>

                  <div className="mt-3 flex w-full items-center gap-1">
                    <LocationIcon />
                    <p className="flex-1">{schedule.address}</p>
                  </div>
                  <div className="flex w-full items-center gap-1">
                    <ClockIcon />
                    <p>{`${schedule.meetingStartTime.slice(11)} ~ ${schedule.meetingEndTime.slice(11)}`}</p>
                  </div>
                </li>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </TitleAndDes>
  );
}

import { type RefObject } from 'react';
import type { Meeting } from '@/shared/types/entities';
import Text from '../../../shared/components/ui/Text';
import TitleAndDes from '../../../shared/components/common/TitleAndDes';
import MeetingDetailScheduleContent from './MeetingDetailScheduleContent';
import MeetingDetailReviews from './MeetingDetailReviews';

export default function MeetingDetailContent({
  meeting,
  sectionRefs,
}: {
  meeting: Meeting;
  sectionRefs: RefObject<Record<string, HTMLDivElement | null>>;
}) {
  return (
    <div className="box-border w-full px-5 lg:px-0">
      <TitleAndDes
        title="모임 소개"
        wrapStyle="py-10"
        ref={(el) => {
          sectionRefs.current['intro'] = el;
        }}
      >
        <Text variant="B2_Medium">{meeting?.introduction}</Text>
      </TitleAndDes>

      <MeetingDetailScheduleContent
        schedules={meeting.schedules}
        sectionRefs={sectionRefs}
      />

      <TitleAndDes
        title="공지사항"
        wrapStyle="py-10"
        ref={(el) => {
          sectionRefs.current['notice'] = el;
        }}
      >
        <Text variant="B2_Medium">{meeting?.info}</Text>
      </TitleAndDes>

      <MeetingDetailReviews
        meetingId={meeting.id}
        ref={(el) => {
          sectionRefs.current['review'] = el;
        }}
      />
    </div>
  );
}

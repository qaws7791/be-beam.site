import type { Meeting } from '@/shared/types/entities';
import { Tag } from '../../../shared/components/ui/Tag';
import Text from '../../../shared/components/ui/Text';
import RecruitmentTypeAndTopic from './RecruitmentTypeAndTopic';
import TitleAndDescription from '../../../shared/components/common/TitleAndDes';
import { cn } from '@/styles/tailwind';

export default function MeetingDetailCardTop({
  meeting,
  isBlock = 'block',
}: {
  meeting: Meeting;
  isBlock?: string;
}) {
  return (
    <div
      className={cn(
        isBlock,
        'box-border w-full rounded-t-4xl bg-white px-8 pt-8 pb-4 lg:rounded-none lg:px-0 lg:py-0',
      )}
    >
      <RecruitmentTypeAndTopic
        recruitmentType={meeting?.recruitmentType}
        topic={meeting?.topic}
      />

      <Text variant="H2_Semibold" className="mt-3 lg:mt-6">
        <span className="mr-2 text-gray-500">{meeting?.recruitmentStatus}</span>
        {meeting?.name}
      </Text>

      <div className="mt-4 flex items-center gap-x-2 text-b1">
        <Tag
          variant="primary"
          className="rounded-full border-1 border-primary px-5 py-4"
        >
          {meeting?.meetingMode}
        </Tag>
        <Tag
          variant="primary"
          className="rounded-full border-1 border-primary px-5 py-4"
        >
          {meeting?.selectionType}
        </Tag>
      </div>

      <TitleAndDescription
        title="모집 기간"
        titleStyle="text-b2 text-gray-600"
        wrapStyle="mt-6 flex items-center gap-2"
      >
        <Text variant="B2_Medium">
          {`${meeting?.recruitingStartTime?.slice(0, 10)} ~ ${meeting?.recruitingEndTime?.slice(0, 10)}`}
        </Text>
      </TitleAndDescription>

      <TitleAndDescription
        title="모집 인원"
        titleStyle="text-b2 text-gray-600"
        wrapStyle="mt-1 flex items-center gap-2"
      >
        <Text variant="B2_Medium">
          {`${meeting?.minParticipants}명 ~ ${meeting?.maxParticipants}명`}
        </Text>
      </TitleAndDescription>

      <div className="mt-5 flex items-center gap-2">
        {meeting?.hashtags?.map((hashtag, idx) => (
          <Tag
            key={idx}
            variant="primary"
            className="mr-1 rounded-md border-none bg-transparent p-0 text-b1 lg:mr-0 lg:bg-[#FFE2CE] lg:px-2 lg:py-1"
          >
            {`#${hashtag}`}
          </Tag>
        ))}
      </div>
    </div>
  );
}

import Badge from '../atoms/badge/Badge';
import Text from '../atoms/text/Text';
import RecruitmentTypeAndTopic from '../molecules/RecruitmentTypeAndTopic';
import { formatNumberWithComma } from '@/utils/cash';

import type { MeetingDetailType } from '@/types/components';
import MeetingCardInfoItemWrap from './MeetingCardInfoItemWrap';
import TitleAndDescription from '../molecules/TitleAndDes';

export default function MeetingDetailCardTop({
  meeting,
}: {
  meeting: MeetingDetailType;
}) {
  const meetingStatusComment =
    meeting?.recruitingState === '모집예정' ||
    meeting?.recruitingState === '모집중' ||
    meeting?.recruitingState === '모집종료'
      ? `📢 현재 ${meeting?.applicantCount}명이 모임 신청 중이에요 !`
      : meeting?.recruitingState === '모임중'
        ? `📢 현재 ${meeting?.participantCount}명이 모임 참여 중이에요 !`
        : `📢 총 ${meeting?.participantCount}명이 모임에 참여했습니다 !`;

  return (
    <div className="w-full">
      <RecruitmentTypeAndTopic
        recruitmentType={meeting?.recruitmentType}
        topic={meeting?.topic}
      />

      <Text variant="H2_Semibold" className="mt-6">
        {meeting?.name}
      </Text>

      <div className="mt-5 flex items-center gap-x-2">
        <Text
          variant="B1_Semibold"
          color="primary"
          className="box-border rounded-lg border-1 border-primary bg-[#FFFAF0] px-4 py-2"
        >
          {meeting?.meetingMode}
        </Text>
        <Text
          variant="B1_Semibold"
          color="primary"
          className="box-border rounded-lg border-1 border-primary bg-[#FFFAF0] px-4 py-2"
        >
          {meeting?.selectionType}
        </Text>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <TitleAndDescription
          title="모집 기간"
          titleStyle="text-b2 text-gray-600"
          wrapStyle="flex items-center gap-2"
        >
          <Text variant="B2_Medium">
            {meeting?.recruitingStartTime?.slice(0, 10)} ~
            {meeting?.recruitingEndTime?.slice(0, 10)}
          </Text>
        </TitleAndDescription>

        <Badge variant="purple" text={meeting?.recruitingState} />
      </div>

      <Badge
        text={meetingStatusComment}
        variant="tertiary"
        className="mt-4 inline-block rounded-md bg-gray-200 p-2 text-b3 text-gray-600"
      />

      <MeetingCardInfoItemWrap meeting={meeting} />

      <Text variant="H2_Semibold" className="mt-5 text-right">
        총 {formatNumberWithComma(meeting?.paymentAmount)}원
      </Text>
    </div>
  );
}

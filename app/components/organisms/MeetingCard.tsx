import { formatToMonthAndDayDate } from '@/utils/date';
import Text from '../atoms/text/Text';

import { cn } from '@/lib/tailwind';
import type { MeetingSummary } from '@/types/entities';
import { Tag } from '../atoms/tag/Tag';

export interface MeetingCardProp extends MeetingSummary {
  onClick: () => void;
  classNames?: string;
  isLikeBtn?: boolean;
  onLikeClick?: () => void;
  children?: React.ReactNode;
}

export default function MeetingCard({
  image,
  recruitmentType,
  recruitmentStatus,
  name,
  meetingStartTime,
  address,
  onClick,
  classNames,
  isLikeBtn = false,
  onLikeClick,
  liked,
  children,
}: MeetingCardProp) {
  return (
    <div className={cn('relative w-full cursor-pointer', classNames)}>
      <img
        className="h-[226px] w-full rounded-2xl object-cover"
        src={image}
        alt="meeting_thumbnail"
      />

      <Tag
        variant={
          recruitmentStatus === '모집예정'
            ? 'primary'
            : recruitmentStatus === '모집중'
              ? 'blue'
              : recruitmentStatus === '모집종료'
                ? 'tertiary'
                : recruitmentStatus === '모임중'
                  ? 'pink'
                  : 'brown'
        }
        className="absolute top-5 left-5"
      >
        {recruitmentStatus}
      </Tag>

      <img
        onClick={onLikeClick}
        className={cn('absolute top-5 right-5', isLikeBtn ? 'block' : 'hidden')}
        src={liked ? '/images/icons/fill_like.svg' : '/images/icons/w_like.svg'}
        alt="like_icon"
      />

      <div className="relative w-full py-3">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {recruitmentType}
        </Text>
        <Text variant="T2_Semibold" onClick={onClick} className="line-clamp-1">
          {name}
        </Text>

        <div className="mt-3 flex items-center gap-2">
          <img src="/images/icons/location.svg" alt="location_icon" />
          <Text variant="B3_Regular" color="gray-600" className="line-clamp-1">
            {address}
          </Text>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <img src="/images/icons/clock.svg" alt="clock_icon" />
          <Text variant="B3_Regular" color="gray-600">
            {`모임 시작일 ${formatToMonthAndDayDate(meetingStartTime)}`}
          </Text>
        </div>

        {children}
      </div>
    </div>
  );
}

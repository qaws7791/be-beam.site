import { formatToMonthAndDayDate } from '@/utils/date';
import Text from '../atoms/text/Text';

import clsx from 'clsx';
import Badge from '../atoms/badge/Badge';

export interface MeetingCardProp {
  image: string;
  meetingType: string;
  recruitmentType: string;
  name: string;
  meetingStartTime: string;
  address: string;
  onClick: () => void;
  classNames?: string;
  isLikeBtn?: boolean;
  isLike?: boolean;
  children?: React.ReactNode;
}

export default function MeetingCard({
  image,
  meetingType,
  recruitmentType,
  name,
  meetingStartTime,
  address,
  onClick,
  classNames,
  isLikeBtn = false,
  isLike,
  children,
}: MeetingCardProp) {
  return (
    <div className={clsx('relative w-full cursor-pointer', classNames)}>
      <img
        className="h-[226px] w-full rounded-2xl object-cover"
        src={image}
        alt="meeting_thumbnail"
      />

      <Badge
        variant="purple"
        className="color-[#3940E4] absolute top-5 left-5 rounded-lg px-3 py-2 text-c1"
        text={recruitmentType}
      />

      <img
        className={clsx(
          'absolute top-5 right-5',
          isLikeBtn ? 'block' : 'hidden',
        )}
        src={
          isLike ? '/images/icons/fill_like.svg' : '/images/icons/w_like.svg'
        }
        alt="like_icon"
      />

      <div className="relative w-full py-3">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {meetingType}
        </Text>
        <Text variant="T2_Semibold" onClick={onClick}>
          {name}
        </Text>

        <div className="mt-3 flex items-center gap-2">
          <img src="/images/icons/location.svg" alt="location_icon" />
          <Text variant="B3_Regular" color="gray-600">
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

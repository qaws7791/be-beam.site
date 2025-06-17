import { formatToKoreanDate } from '@/utils/data';
import Text from '../atoms/text/Text';
import clsx from 'clsx';

export interface MeetingCardProp {
  image: string;
  meetingType: string;
  recruitmentType: string;
  name: string;
  meetingStartTime: string;
  address: string;
  onClick: () => void;
  classNames?: string;
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
}: MeetingCardProp) {
  return (
    <div
      onClick={onClick}
      className={clsx('relative w-full cursor-pointer', classNames)}
    >
      <img
        className="h-[226px] w-full rounded-2xl object-cover"
        src={image}
        alt="meeting_thumbnail"
      />

      <Text
        variant="C1_Semibold"
        color="purple"
        className="absolute top-5 left-5 rounded-lg bg-[#E9EAFF] px-3 py-2"
      >
        {recruitmentType}
      </Text>

      <div className="w-full py-3">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {meetingType}
        </Text>
        <Text variant="T2_Semibold">{name}</Text>

        <div className="mt-3 flex items-center gap-2">
          <img src="/images/icons/location.svg" alt="location_icon" />
          <Text variant="B3_Regular" color="gray-600">
            {address}
          </Text>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <img src="/images/icons/clock.svg" alt="clock_icon" />
          <Text variant="B3_Regular" color="gray-600">
            {`${meetingType[0] === '정기모임' ? '첫 모임' : ''} ${formatToKoreanDate(meetingStartTime)}`}
          </Text>
        </div>
      </div>
    </div>
  );
}

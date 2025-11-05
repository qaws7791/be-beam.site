import { useNavigate } from 'react-router';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';

import type { MeetingSummary } from '@/shared/types/entities';
import MeetingCard from '../../../features/meetings/components/MeetingCard';

export interface MeetingListSectionProps {
  meetings: MeetingSummary[];
  isLikedBtn: boolean;
}

export default function MeetingCardGroup({
  meetings,
  isLikedBtn,
}: MeetingListSectionProps) {
  const navigate = useNavigate();

  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation();

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-8 lg:grid-cols-4">
      {meetings?.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          recruitmentType={meeting.recruitmentType}
          recruitmentStatus={meeting.recruitmentStatus}
          name={meeting.name}
          image={meeting.image}
          meetingStartTime={meeting.meetingStartTime}
          meetingEndTime={meeting.meetingEndTime}
          paymentAmount={meeting.paymentAmount}
          liked={meeting.liked}
          isLikeBtn={isLikedBtn}
          onClick={() => navigate(`/meeting/${meeting.id}`)}
          onLikeClick={() => {
            if (isPending) return;
            if (meeting) {
              likeMeeting(meeting as { id: number; liked: boolean });
            }
          }}
          classNames="lg:mb-12 mb-6"
        />
      ))}
    </div>
  );
}

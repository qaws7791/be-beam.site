// dumb 컴포넌트: UI 중심
import { useNavigate } from 'react-router';

import GridGroup from '../organisms/gridGroup/GridGroup';
import MeetingCard from '../organisms/MeetingCard';

interface MeetingResultType {
  pageInfo: {
    hasNext: boolean;
    nextCursor: number;
    size: number;
  };
  meetings: {
    id: number;
    name: string;
    address: string;
    cost: [string, number];
    edit: number;
    image: string;
    like: number;
    meetingStartTime: string;
    meetingType: string[];
    mode: string;
    recruitmentType: string[];
    topic: string;
  }[];
}

interface MeetingListSectionProps {
  meetings: MeetingResultType;
}

export default function MeetingCardGroup({
  meetings,
}: MeetingListSectionProps) {
  const navigate = useNavigate();

  return (
    <GridGroup columns={4} gap={5} className="mt-8">
      {meetings?.meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meetingType={meeting.meetingType[0]}
          recruitmentType={meeting.recruitmentType[0]}
          name={meeting.name}
          image={meeting.image}
          address={meeting.address}
          meetingStartTime={meeting.meetingStartTime}
          onClick={() => navigate(`/meeting/${meeting.id}`)}
          classNames="mb-12"
        />
      ))}
    </GridGroup>
  );
}

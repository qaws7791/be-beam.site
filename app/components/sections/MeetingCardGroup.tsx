import MeetingCard from '../organisms/MeetingCard';
import { useNavigate } from 'react-router';
import GridGroup from '../organisms/gridGroup/GridGroup';

export interface MeetingType {
  id: number;
  name: string;
  address: string;
  cost: (string | number)[];
  edit: number;
  image: string;
  like: number;
  meetingStartTime: string;
  meetingType: string[];
  mode: string;
  recruitmentType: string[];
  topic: string;
}

interface MeetingListSectionProps {
  meetings: MeetingType[];
}

export default function MeetingCardGroup({
  meetings,
}: MeetingListSectionProps) {
  const navigate = useNavigate();

  return (
    <GridGroup columns={4} gap={5} className="mt-8">
      {meetings?.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meetingType={meeting.meetingType[0]}
          recruitmentType={meeting.recruitmentType[0]}
          name={meeting.name}
          image={meeting.image}
          address={meeting.address}
          meetingStartTime={meeting.meetingStartTime}
          isLikeBtn={true}
          onClick={() => navigate(`/meeting/${meeting.id}`)}
          classNames="mb-12"
        />
      ))}
    </GridGroup>
  );
}

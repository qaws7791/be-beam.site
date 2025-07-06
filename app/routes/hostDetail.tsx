import Badge from '@/components/atoms/badge/Badge';
import { Button } from '@/components/atoms/button/Button';
import Text from '@/components/atoms/text/Text';
import GridGroup from '@/components/organisms/gridGroup/GridGroup';
import CommonTemplate from '@/components/templates/CommonTemplate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

interface meetingType {
  id: number;
  meetingName: string;
  meetingImage: string;
  topic: string;
}

export function meta() {
  return [
    { title: '호스트 상세페이지' },
    { name: 'description', content: '호스트 상세정보를 확인하세요.' },
  ];
}

export default function HostDetail() {
  const navigate = useNavigate();

  const id = Number(useParams()?.hostId);
  console.log(id);

  const { data: hostDetail } = useQuery({
    queryKey: ['hostDetail', id],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `/api/web/v2/host/${id}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  return (
    <CommonTemplate>
      <Text variant="H2_Semibold">호스트 프로필</Text>

      <div className="mt-14 flex w-full items-center gap-6">
        <div className="relative">
          <img
            className="h-22 w-22 rounded-full object-cover"
            src={hostDetail?.hostImage}
            alt="host_profile_image"
          />
          <img
            className="absolute bottom-0 left-0"
            src="/images/icons/host.svg"
            alt="host_icon"
          />
        </div>

        <div>
          <div className="flex items-center gap-6">
            <Text variant="T2_Semibold">{hostDetail?.hostName}</Text>
            <Button className="h-8 w-17 text-b1">팔로우</Button>
          </div>
          <Text variant="B2_Medium" className="mt-2">
            {hostDetail?.hostInstruction}
          </Text>
          <Text variant="C1_Semibold" className="mt-2">
            <span className="mr-2 text-c2 text-gray-500">팔로워</span>
            {hostDetail?.followCount}
          </Text>
        </div>
      </div>

      <div className="mt-20 w-full">
        <Text variant="T3_Semibold" className="mb-5">
          호스트 소개
        </Text>
        <Text>{hostDetail?.hostDescription}</Text>
      </div>

      <div className="mt-20 w-full">
        <Text variant="T3_Semibold">
          개설한 모임
          <span className="ml-2 text-gray-500">
            {hostDetail?.openingMeetingCount}
          </span>
        </Text>
        <GridGroup columns={3} gap={4} className="mt-4">
          {hostDetail?.openingMeetings?.map((meeting: meetingType) => (
            <div
              key={meeting.id}
              className="box-border flex w-full items-center gap-4 rounded-lg border-1 border-gray-300 p-6"
            >
              <img
                className="h-25 w-25 rounded-lg object-cover"
                src={meeting.meetingImage}
                alt="meeting_thumbnail"
              />
              <div>
                <Text
                  variant="B2_Medium"
                  className="cursor-pointer"
                  onClick={() => navigate(`/meeting/${meeting.id}`)}
                >
                  {meeting.meetingName}
                </Text>
                <Badge
                  text={meeting.topic}
                  className="mt-3 inline-block border-none px-2 py-1 text-b1"
                />
              </div>
            </div>
          ))}
        </GridGroup>
      </div>
    </CommonTemplate>
  );
}

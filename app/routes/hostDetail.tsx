import { useNavigate, useParams } from 'react-router';
import useHostQuery from '@/hooks/api/useHostQuery';
import useHostFollowAndFollowCancelMutation from '@/hooks/api/useHostFollowAndFollowCancelMutation';

import CommonTemplate from '@/components/templates/CommonTemplate';
import Badge from '@/components/atoms/badge/Badge';
import { Button } from '@/components/atoms/button/Button';
import Text from '@/components/atoms/text/Text';
import GridGroup from '@/components/organisms/gridGroup/GridGroup';
import { useModalStore } from '@/stores/useModalStore';

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
  const { data: hostDetail } = useHostQuery(id);

  const { mutate: followHost, isPending: isPending } =
    useHostFollowAndFollowCancelMutation(
      hostDetail?.followed ? 'DELETE' : 'POST',
    );

  const { open } = useModalStore();

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

        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-6">
              <Text variant="T2_Semibold">{hostDetail?.hostName}</Text>
              <Button
                onClick={() => {
                  if (isPending) return;
                  followHost();
                }}
                className="h-8 px-4 text-b1"
              >
                {hostDetail?.followed ? '팔로우 취소' : '팔로우'}
              </Button>
            </div>

            <Button
              variant="tertiary"
              className="border-none text-t3"
              onClick={() => {
                open('DECLARE_MODAL', { type: 'host', id: id });
              }}
            >
              호스트 신고하기
              <img
                src="/images/icons/next.svg"
                alt="next_icon"
                className="ml-1"
              />
            </Button>
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

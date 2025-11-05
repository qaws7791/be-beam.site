import { useNavigate, useRouteLoaderData } from 'react-router';
import useHostQuery from '@/features/users/hooks/useHostQuery';
import useHostFollowAndFollowCancelMutation from '@/features/users/hooks/useHostFollowAndFollowCancelMutation';
import { useModalStore } from '@/shared/stores/useModalStore';

import { cn } from '@/styles/tailwind';
import { Button } from '../../../shared/components/ui/Button';
import Text from '../../../shared/components/ui/Text';
import { Tag } from '../../../shared/components/ui/Tag';
import toast from 'react-hot-toast';
import SirenIcon from '@/shared/components/icons/SirenIcon';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';

interface meetingType {
  id: number;
  meetingName: string;
  meetingImage: string;
  topic: string;
}

export default function HostDetailWrap({ id }: { id: number }) {
  const navigate = useNavigate();

  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;

  const { data: host } = useHostQuery(id);
  const { mutate: followHost, isPending } =
    useHostFollowAndFollowCancelMutation(id, host);

  const { open } = useModalStore();

  return (
    <div className="w-full">
      <Text variant="H2_Semibold">호스트 프로필</Text>

      <div className="mt-3 flex w-full items-center gap-6 md:mt-14">
        <div className="relative h-22 w-22">
          <img
            className="h-full w-full rounded-full object-cover"
            src={host?.hostImage}
            alt="host_profile_image"
          />
          <img
            className="absolute bottom-0 left-0"
            src="/images/icons/host.svg"
            alt="host_icon"
          />
        </div>

        <div className="w-full flex-1">
          <div className="flex w-full items-center justify-between">
            <div className="block items-center gap-6 md:flex">
              <Text variant="T2_Semibold">{host?.hostName}</Text>
              <Button
                onClick={() => {
                  if (user) {
                    if (isPending) return;
                    followHost();
                  } else {
                    toast('로그인 후 다시 시도해주세요.');
                  }
                }}
                className={cn(
                  host.hostName === user?.nickname
                    ? 'hidden'
                    : 'hidden md:block',
                  'h-8 px-4 text-b1',
                )}
              >
                {host?.followed ? '팔로우 취소' : '팔로우'}
              </Button>
            </div>

            <div className="flex items-center gap-1 md:block">
              <Button
                onClick={() => {
                  if (user) {
                    if (isPending) return;
                    followHost();
                  } else {
                    toast('로그인 후 다시 시도해주세요.');
                  }
                }}
                className={cn(
                  host.hostName === user?.nickname
                    ? 'hidden'
                    : 'block md:hidden',
                  'h-8 px-4 text-b1',
                )}
              >
                {host?.followed ? '팔로우 취소' : '팔로우'}
              </Button>
              <Button
                variant="outline"
                size="md"
                className={cn(
                  host.hostName === user?.nickname ? 'hidden' : 'flex',
                  'box-border aspect-square flex-col justify-center gap-0 border-none p-2 text-b3 md:aspect-auto md:flex-row md:items-center md:justify-between md:gap-3 md:text-t3',
                )}
                onClick={() => {
                  if (user) {
                    open('DECLARE_MODAL', {
                      type: 'host',
                      id: id,
                      refetchKey: 'hostDetail',
                    });
                  } else {
                    toast('로그인 후 다시 시도해주세요.');
                  }
                }}
              >
                <SirenIcon width={25} height={25} className="md:hidden" />
                <p className="hidden md:block">호스트 신고하기</p>
                <p className="md:hidden">신고</p>
                <ArrowRightIcon
                  width={25}
                  height={25}
                  className="hidden md:block"
                />
              </Button>
            </div>
          </div>

          <Text variant="B2_Medium" className="mt-2">
            {host?.hostInstruction}
          </Text>
          <Text variant="C1_Semibold" className="mt-2">
            <span className="mr-2 text-c2 text-gray-500">팔로워</span>
            {host?.followCount}
          </Text>
        </div>
      </div>

      <div className="mt-10 w-full md:mt-20">
        <Text variant="T3_Semibold">
          개설한 모임
          <span className="ml-2 text-gray-500">
            {host?.openingMeetingCount}
          </span>
        </Text>

        <div className="mt-4 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {host?.openingMeetings?.map((meeting: meetingType) => (
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
                <Tag className="mt-3 border-none px-2 py-1 text-b1">
                  {meeting.topic}
                </Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

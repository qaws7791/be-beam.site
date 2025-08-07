import { useLocation, useNavigate } from 'react-router';
import { Tabs, TabsList, TabsTrigger } from '../atoms/tabs/Tabs';
import { useEffect, useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getMyCreatedMeetingDetail,
  getMyCreatedMeetingIntro,
} from '@/api/users';
import Text from '../atoms/text/Text';

export default function CreatedMeetingDetailWrap({
  meetingId,
}: {
  meetingId: number;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/')[4];

  const [tab, setTab] = useState('intro');

  useEffect(() => {
    if (pathSegments) {
      setTab(pathSegments);
    }
  }, [pathSegments]);

  const tabList = [
    { label: '모임 소개', value: 'intro' },
    { label: '모임 상세', value: 'detail' },
    { label: '모임 관리', value: 'manage' },
  ];

  const queryResult = useSuspenseQueries({
    queries: [
      {
        queryKey: ['createdMeetingIntro', meetingId],
        queryFn: () => getMyCreatedMeetingIntro(meetingId),
      },
      {
        queryKey: ['createdMeetingDetail', meetingId],
        queryFn: () => getMyCreatedMeetingDetail(meetingId),
      },
    ],
  });
  const [{ data: intro }, { data: detail }] = queryResult;

  return (
    <>
      <div className="w-full">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {detail?.recruitmentType}
        </Text>
        <Text variant="H1_Bold" className="mb-5">
          {intro?.name}
        </Text>

        <img
          className="h-[480px] w-full rounded-md object-cover"
          src={intro?.meetingThumbnail}
          alt="meeting_thumbnail"
        />
      </div>

      <div className="mt-7 w-full py-5">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            navigate(`/myPage/created/${meetingId}/${value}`);
            setTab(value);
          }}
        >
          <div className="relative w-full text-t2">
            <TabsList className="gap-8">
              {tabList.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-primary after:transition-all after:duration-300 after:content-[''] data-[state=active]:text-primary data-[state=active]:after:scale-x-100 data-[state=active]:after:bg-primary"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="absolute bottom-0 left-0 h-px w-full bg-gray-300" />
          </div>
        </Tabs>
      </div>
    </>
  );
}

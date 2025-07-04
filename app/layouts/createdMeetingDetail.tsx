import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import useCreatedMeetingDetailQuery from '@/hooks/api/useCreatedMeetingDetailQuery';

import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs/Tabs';
import CommonTemplate from '@/components/templates/CommonTemplate';
import Text from '@/components/atoms/text/Text';

export default function CreatedMeetingDetail() {
  const navigate = useNavigate();
  const id = Number(useParams().meetingId);
  const pathSegments = location.pathname.split('/')[4];

  const [tab, setTab] = useState('intro');

  useEffect(() => {
    if (pathSegments) {
      setTab(pathSegments);
    }
  }, [pathSegments]);

  const { data: createdMeetingDetail } = useCreatedMeetingDetailQuery(id);

  const tabList = [
    { label: '모임 소개', value: 'intro' },
    { label: '모임 상세', value: 'detail' },
    { label: '모임 관리', value: 'manage' },
  ];

  return (
    <CommonTemplate>
      <div className="w-full">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {createdMeetingDetail?.recruitmentType}
        </Text>
        <Text variant="H1_Bold" className="mb-5">
          {createdMeetingDetail?.name}
        </Text>

        <img
          className="h-[480px] w-full rounded-md object-cover"
          src={createdMeetingDetail?.thumbnailImage}
          alt="meeting_thumbnail"
        />
      </div>

      <div className="mt-7 w-full py-5">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            navigate(`/myPage/created/${id}/${value}`);
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
            <div className="absolute bottom-0 left-0 h-px w-[550px] bg-gray-300" />
          </div>
        </Tabs>

        <Outlet />
      </div>
    </CommonTemplate>
  );
}

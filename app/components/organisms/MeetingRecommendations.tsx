import { useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs/Tabs';
import Text from '../atoms/text/Text';
import MeetingCard from './MeetingCard';
import GridGroup from './gridGroup/GridGroup';
import useMeetingRecommendationQuery from '@/hooks/api/useMeetingRecommendationsQuery';
import LoadingSpinner from '../molecules/LoadingSpinner';

interface MeetingType {
  id: number;
  name: string;
  thumbnailImage: string;
  recruitmentType: string;
  recruitmentStatus: string;
  meetingStartTime: string;
  address: string;
  liked?: boolean;
}

export default function MeetingRecommendations({
  title,
  type,
  className,
}: {
  title: string;
  type: string;
  className?: string;
}) {
  const navigate = useNavigate();

  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;

  const [tab, setTab] = useState('all');
  const { data: datas, isLoading } = useMeetingRecommendationQuery(type, tab);

  const tabList = [
    {
      text: '전체',
      value: 'all',
    },
    {
      text: '정기모임',
      value: 'regular',
    },
    {
      text: '소모임',
      value: 'small',
    },
  ];

  return (
    <div className={`${className} w-full text-left`}>
      <Text variant="H2_Semibold">{title}</Text>

      <div className="mt-6 mb-5 flex w-full items-center gap-3">
        <Tabs
          defaultValue="all"
          className="w-full text-b1"
          value={tab}
          onValueChange={(value) => setTab(value)}
        >
          <TabsList className="h-auto gap-3 before:h-0">
            {tabList.map((data, idx) => (
              <TabsTrigger
                key={idx}
                className="cursor-pointer rounded-3xl bg-gray-200 px-5 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value={data.value}
              >
                {data.text}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabList?.map((tab, idx) => (
            <TabsContent key={idx} value={tab.value} className="mt-5 w-full">
              <GridGroup columns={4}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {datas?.map((meeting: MeetingType) => (
                      <MeetingCard
                        key={meeting.id}
                        name={meeting.name}
                        image={meeting.thumbnailImage}
                        recruitmentStatus={
                          meeting.recruitmentStatus === 'UPCOMING'
                            ? '모집예정'
                            : meeting.recruitmentStatus === 'RECRUITING'
                              ? '모집중'
                              : meeting.recruitmentStatus === 'CLOSED'
                                ? '모집종료'
                                : meeting.recruitmentStatus === 'INPROGRESS'
                                  ? '모임중'
                                  : '모임완료'
                        }
                        recruitmentType={
                          meeting.recruitmentType === 'SMALL'
                            ? '소모임'
                            : '정기모임'
                        }
                        meetingStartTime={meeting.meetingStartTime.slice(0, 10)}
                        address={meeting.address}
                        onClick={() => navigate(`/meeting/${meeting.id}`)}
                        isLikeBtn={user}
                        liked={meeting.liked}
                      />
                    ))}
                  </>
                )}
              </GridGroup>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

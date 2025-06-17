// Smart 컴포넌트: 기능 중심(모임 데이터 패치)

import { useState } from 'react';
import { useMeetingsQuery } from '@/hooks/api/useMeetingsQuery';
import { getInitialFilters } from '@/utils/filter';

import Banner from '@/components/atoms/Banner';
import MeetingFilterControls from '@/components/organisms/MeetingFilterControls';
import MeetingCardGroup from '@/components/sections/MeetingCardsGroup';

export default function GetMeetingsContainer() {
  const filters = [
    {
      label: '모임 유형',
      options: ['전체', '정기모임', '소모임'],
      values: ['all', 'reg', 'small'],
    },
    {
      label: '모집 상태',
      options: [
        '전체',
        '모집 예정',
        '모집 중',
        '모집 마감',
        '모임 중',
        '모임 완료',
      ],
      values: [
        'all',
        'upcoming',
        'recruiting',
        'closed',
        'activiting',
        'success',
      ],
    },
    {
      label: '모임 방식',
      options: ['전체', '오프라인', '온라인', '혼합'],
      values: ['all', 'offline', 'online', 'mix'],
    },
    {
      label: '참가비',
      options: ['전체', '무료', '유료'],
      values: ['all', 'free', 'cash'],
    },
    {
      label: '정렬',
      options: ['최신순', '좋아요순'],
      values: ['recent', 'like'],
    },
  ];

  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >(() => getInitialFilters(filters));
  const [search, setSearch] = useState('');

  const { data: meetings } = useMeetingsQuery(
    search,
    selectedTopic,
    selectedFilters,
  );

  console.log(meetings);

  return (
    <div>
      <Banner
        imageUrl="https://i.pinimg.com/736x/20/92/e7/2092e79552015eb068a6870f76fbaf88.jpg"
        height="h-[260px]"
      />

      <MeetingFilterControls
        filters={filters}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        search={search}
        setSearch={setSearch}
      />

      <MeetingCardGroup meetings={meetings} />
    </div>
  );
}

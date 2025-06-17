import { http, HttpResponse } from 'msw';

import meetingsMockData from '../mockMeetings.json';

const meetingHandlers = [
  // 모임 리스트 GET 요청
  http.get('/api/web/v2/meetings', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 필요한 queryParam을 추출
    const search = searchParams.get('search') ?? '';
    const topic = searchParams.get('topic') ?? 'all';
    const meetingType = searchParams.get('meeting-type') ?? 'all';
    const recruitmentType = searchParams.get('recruitment-type') ?? 'all';
    const mode = searchParams.get('mode') ?? 'all';
    const cost = searchParams.get('cost') ?? 'all';
    const sort = searchParams.get('sort') ?? 'recent';
    const cursor = parseInt(searchParams.get('cursor') || '0');
    const size = parseInt(searchParams.get('size') || '12');

    // 필터링
    let filteredMeetings = meetingsMockData.meetings;

    if (search) {
      filteredMeetings = filteredMeetings.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (topic !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.topic === topic);
    }

    if (meetingType !== 'all') {
      filteredMeetings = filteredMeetings.filter(
        (m) => m.meetingType[1] === meetingType,
      );
    }

    if (recruitmentType !== 'all') {
      filteredMeetings = filteredMeetings.filter(
        (m) => m.recruitmentType[1] === recruitmentType,
      );
    }

    if (mode !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.mode === mode);
    }

    if (cost !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.cost[0] === cost);
    }

    // 정렬
    if (sort === 'recent') {
      filteredMeetings = filteredMeetings.sort((a, b) => b.edit - a.edit);
    } else if (sort === 'like') {
      filteredMeetings = filteredMeetings.sort((a, b) => b.like - a.like);
    }

    const paginatedMeetings = filteredMeetings.slice(cursor, cursor + size);

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        pageInfo: {
          nextCursor: cursor + size,
          size,
          hasNext: cursor + size < paginatedMeetings.length,
        },
        meetings: paginatedMeetings,
      },
    });
  }),
];

export default meetingHandlers;

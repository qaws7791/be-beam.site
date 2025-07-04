import { http, HttpResponse } from 'msw';

interface Banner {
  bannerId: number;
  bannerImg: string;
  bannerUrl: string;
}

interface Meeting {
  id: number;
  name: string;
  recruitmentStatus: string;
  recruitmentType: string;
  meetingStartTime: string;
  address: string;
  image: string;
  liked: boolean;
}

interface MeetingCategory {
  all: Meeting[];
  regular: Meeting[];
  small: Meeting[];
  [key: string]: Meeting[];
}

interface HomeContent {
  banners: Banner[];
  recByLikesMeetings: MeetingCategory;
  randomMeetings: MeetingCategory;
  latestMeetings: MeetingCategory;
}

interface MockHomeJson {
  home: HomeContent;
}

import homeMockData from '../mockHome.json';
const typedHomeMockData: MockHomeJson = homeMockData as MockHomeJson;

const guidBookHandlers = [
  // 홈 배너, 추천 모임 리스트 GET 요청
  http.get('/api/web/v1/home', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const likes = (searchParams.get('likes') ?? 'all') as keyof MeetingCategory;
    const random = (searchParams.get('random') ??
      'all') as keyof MeetingCategory;
    const recent = (searchParams.get('recent') ??
      'all') as keyof MeetingCategory;

    const filteredHomeData = typedHomeMockData.home;

    const filteredRecByLikesMeetings: Meeting[] =
      filteredHomeData.recByLikesMeetings[likes];
    const filteredRandomMeetings: Meeting[] =
      filteredHomeData.randomMeetings[random];
    const filteredLatestMeetings: Meeting[] =
      filteredHomeData.latestMeetings[recent];

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        banners: filteredHomeData.banners,
        recByLikesMeetings: filteredRecByLikesMeetings,
        randomMeetings: filteredRandomMeetings,
        latestMeetings: filteredLatestMeetings,
      },
    });
  }),
];

export default guidBookHandlers;

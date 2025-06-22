export type getReviewListParams = {
  sort: 'recent' | 'likes';
  type: 'image' | 'text';
  rating: 'all' | 1 | 2 | 3 | 4 | 5;
  recruitmentType: 'all' | 'regular' | 'small';
  cursor?: number;
  size?: number;
};

export type ReviewListResult = {
  reviews: {
    reviewId: number;
    profileImg: string;
    nickname: string;
    rating: number;
    text: string;
    images: string[];
    createdAt: string;
    likesCount: number;
    liked: boolean;
    myReview: boolean;
    meeting: {
      id: number;
      name: string;
      link: string;
    };
  }[];
  pageInfo: {
    nextCursor: number;
    size: number;
    hasNext: boolean;
  };
};

export const getReviewList = async ({
  sort,
  type,
  rating,
  recruitmentType,
  cursor = 0,
  size = 20,
}: getReviewListParams) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = new URLSearchParams({
    sort,
    type,
    rating: rating.toString(),
    recruitmentType,
    cursor: cursor.toString(),
    size: size.toString(),
  });

  // const res = await axiosInstance.get<{
  //   isSuccess: boolean;
  //   code: number;
  //   message: string;
  //   result: ReviewListResult;
  // }>(`/reviews?${searchParams.toString()}`);
  // const data = res.data;
  // return data.result;

  return {
    reviews: [
      {
        reviewId: 48,
        profileImg:
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/user/1591d3ff-6e12-4385-b5da-e816d7d2501a.jpg',
        nickname: '허남준 최고',
        rating: 5,
        text: '그래 내가 글 썼다...',
        images: [],
        createdAt: '2024-10-28T08:08:05.160458',
        likesCount: 0,
        liked: false,
        myReview: false,
        meeting: {
          id: 13,
          name: '소셜다이닝 : 이상식탁',
          link: 'https://www.be-beam.site/meeting/detail/49',
        },
      },
      {
        reviewId: 46,
        profileImg:
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/user/1591d3ff-6e12-4385-b5da-e816d7d2501a.jpg',
        nickname: '허남준 최고',
        rating: 5,
        text: '모임이 너무 최고였습니다!:)',
        images: [
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/review/5a21b336-5b81-4a3b-82e8-201bd61db000.jpg',
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/review/3711809b-b6e8-48a8-820f-95dc4b548d27.jpg',
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/review/e95706e1-c376-43f9-aca0-83e43816457c.jpg',
        ],
        createdAt: '2024-10-28T01:52:46.861053',
        likesCount: 1,
        liked: false,
        myReview: false,
        meeting: {
          id: 15,
          name: '사진출사모임 : 나를 기록하는 사진관 (정기모임) (모집마감)',
          link: 'https://www.be-beam.site/meeting/detail/49',
        },
      },
      {
        reviewId: 8,
        profileImg:
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/user/a837ca1f-8e41-480a-b95d-6b94fd2838f5.jpg',
        nickname: '정희수',
        rating: 5,
        text: '매우 좋아요! 시간 가는 줄 몰르고 즐겼네요 맛있는 음식도 먹으니 기분이 너무 좋았어요!XD',
        images: [
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/review/994a4b5c-a6dc-485d-b908-da2f2ad4559d.jpg',
          'https://bebeam.s3.ap-northeast-2.amazonaws.com/review/fd738ae7-9467-4a55-8da6-a91aa11f98a8.jpg',
        ],
        createdAt: '2024-10-27T05:26:36.710858',
        likesCount: 1,
        liked: false,
        myReview: true,
        meeting: {
          id: 13,
          name: '소셜다이닝 : 이상식탁',
          link: 'https://www.be-beam.site/meeting/detail/49',
        },
      },
    ],
    pageInfo: {
      nextCursor: 33,
      size: 5,
      hasNext: true,
    },
  };
};

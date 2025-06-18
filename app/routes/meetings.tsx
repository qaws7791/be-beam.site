// 페이지 && loader && Smart 컴포넌트: 기능 중심(Suspense)

import { Suspense } from 'react';

import CommonTemplate from '@/components/templates/CommonTemplate';
import GetMeetingsContainer from '@/containers/GetMeetingsContainer';

export function meta() {
  return [
    { title: '모임 페이지' },
    { name: 'description', content: '모임을 생성하거나 모임에 참여하세요!' },
  ];
}

// export async function loader() {
//   // 서버에서 미리 데이터를 가져와서 해당 쿼리 캐시에 저장
//   // 실제 api를 사용하게 되면 HydrationBoundary와 함께 사용
//   await queryClient.prefetchQuery({
//     queryKey: [
//       'meetings',
//       '',
//       'all',
//       {
//         '모임 유형': 'all',
//         '모집 상태': 'all',
//         '모임 방식': 'all',
//         참가비: 'all',
//         정렬: 'recent',
//       },
//     ],
//     queryFn: () => getMeetingList(),
//   });

//   return {
//     dehydratedState: dehydrate(queryClient),
//   };
// }

export default function Meetings() {
  // const { dehydratedState } = loaderData;

  return (
    <CommonTemplate>
      <Suspense fallback={<p>Loading...</p>}>
        {/* { <HydrationBoundary state={dehydratedState}></HydrationBoundary>} */}
        <GetMeetingsContainer />
      </Suspense>
    </CommonTemplate>
  );
}

import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/meetings', 'routes/meetings.tsx'),
  route('/meeting/:meetingId', 'routes/meetingDetail.tsx'),
  route('/reviews', 'routes/reviews.tsx'),
  route('/guideBooks', 'routes/guideBooks.tsx'),
  route('/guideBook/:guideBookId', 'routes/guideBookDetail.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/login/callback', 'routes/loginCallback.tsx'),
  route('/search', 'routes/search.tsx'),
  layout('layouts/myPage.tsx', [
    ...prefix('/myPage', [
      route('/participated', 'routes/participatedMeeting.tsx'),
      route('/requested', 'routes/requestedMeeting.tsx'),
      route('/created', 'routes/createdMeeting.tsx'),
      ...prefix('/reviews', [
        layout('layouts/myReview.tsx', [
          route('/written', 'routes/writtenReviews.tsx'),
          route('/reviewable', 'routes/reviewableReviews.tsx'),
        ]),
      ]),
      layout('layouts/myLikes.tsx', [
        ...prefix('/likes', [
          route('/regular', 'routes/regularMeetingLikes.tsx'),
          route('/small', 'routes/smallMeetingLikes.tsx'),
          route('/review', 'routes/reviewLikes.tsx'),
          route('/host', 'routes/hostLikes.tsx'),
        ]),
      ]),
      route('/profile', 'routes/myProfile.tsx'),
      route('/info', 'routes/myInformation.tsx'),
      route('/notifications', 'routes/myNotifications.tsx'),
    ]),
  ]),
  layout('layouts/createdMeetingDetail.tsx', [
    ...prefix('/myPage/created/:meetingId', [
      route('/intro', 'routes/createdMeetingDetailIntro.tsx'),
      route('/detail', 'routes/createdMeetingDetailDetail.tsx'),
      route('/manage', 'routes/createdMeetingDetailManage.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

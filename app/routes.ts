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
  layout('routes/myPage.tsx', [
    ...prefix('/myPage', [
      route('/participated', 'routes/participatedMeeting.tsx'),
      route('/requested', 'routes/requestedMeeting.tsx'),
      route('/created', 'routes/createdMeeting.tsx'),
      route('/reviews', 'routes/myReviews.tsx'),
      layout('layouts/myLikes.tsx', [
        ...prefix('/likes', [
          route('/regular', 'routes/regularMeetingLikes.tsx'),
          route('/small', 'routes/smallMeetingLikes.tsx'),
          route('/review', 'routes/reviewLikes.tsx'),
          route('/host', 'routes/hostLikes.tsx'),
        ]),
      ]),
      route('/profile', 'routes/myProfile.tsx'),
      route('/notifications', 'routes/myNotifications.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

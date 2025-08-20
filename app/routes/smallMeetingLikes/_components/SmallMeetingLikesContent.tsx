import useMyMeetingLikesQuery from '@/features/meetings/hooks/useMyMeetingLikesQuery';
import SmallMeetingLikesGrid from '@/routes/smallMeetingLikes/_components/SmallMeetingLikesGrid';
import SmallMeetingLikesPagination from '@/routes/smallMeetingLikes/_components/SmallMeetingLikesPagination';
import useLikedSmallMeetingsPage from '@/routes/smallMeetingLikes/_hooks/useLikedSmallMeetingsPage';

export default function SmallMeetingLikesContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useLikedSmallMeetingsPage();

  const { data: smallMeetingLikes } = useMyMeetingLikesQuery({
    page: currentPage,
    size: pageSize,
    type: 'small',
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <SmallMeetingLikesGrid meetings={smallMeetingLikes?.meetings || []} />
      <SmallMeetingLikesPagination
        currentPage={currentPage}
        totalPages={smallMeetingLikes?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

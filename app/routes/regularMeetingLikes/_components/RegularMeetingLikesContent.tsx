import useMyMeetingLikesQuery from '@/features/meetings/hooks/useMyMeetingLikesQuery';
import RegularMeetingLikesGrid from '@/routes/regularMeetingLikes/_components/RegularMeetingLikesGrid';
import RegularMeetingLikesPagination from '@/routes/regularMeetingLikes/_components/RegularMeetingLikesPagination';
import useLikedRegularMeetingsPage from '@/routes/regularMeetingLikes/_hooks/useLikedRegularMeetingsPage';

export default function RegularMeetingLikesContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useLikedRegularMeetingsPage();

  const { data: regularMeetingLikes } = useMyMeetingLikesQuery({
    page: currentPage,
    size: pageSize,
    type: 'regular',
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <RegularMeetingLikesGrid meetings={regularMeetingLikes?.meetings || []} />
      <RegularMeetingLikesPagination
        currentPage={currentPage}
        totalPages={regularMeetingLikes?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

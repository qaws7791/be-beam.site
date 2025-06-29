import type { MeetingDetailType } from '@/types/components';
import MeetingDetailCardTop from './MeetingDetailCardTop';
import { Button } from '../atoms/button/Button';

export default function MeetingDetailCard({
  meeting,
}: {
  meeting: MeetingDetailType;
}) {
  return (
    <div className="box-border flex h-[657px] flex-1 flex-col justify-between rounded-xl border-1 border-gray-300 bg-white px-7 py-10">
      <MeetingDetailCardTop meeting={meeting} />

      <div className="mt-8 flex w-full items-center gap-4">
        <Button
          variant="tertiary"
          size="lg"
          className="min-w-28 gap-1 border-gray-300 text-t3 text-gray-700"
        >
          좋아요
          <img
            className="h-6 w-6"
            src={
              meeting?.liked
                ? '/images/icons/fill_like.svg'
                : '/images/icons/like.svg'
            }
            alt="like_icon"
          />
        </Button>

        <Button size="lg" className="gap-1 text-t3 text-white">
          신청하기
        </Button>
      </div>
    </div>
  );
}

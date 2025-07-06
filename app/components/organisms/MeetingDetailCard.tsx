import type { MeetingDetailType } from '@/types/components';
import MeetingDetailCardTop from './MeetingDetailCardTop';
import { Button } from '../atoms/button/Button';
import { useModalStore } from '@/stores/useModalStore';

export default function MeetingDetailCard({
  meeting,
}: {
  meeting: MeetingDetailType;
}) {
  const { open } = useModalStore();

  const getMeetingButtonProps = (
    meeting: MeetingDetailType | undefined | null, // <-- meeting 타입을 optional로 변경
    open: (type: string, props: unknown) => void,
  ) => {
    if (!meeting) {
      return {
        text: '정보 없음',
        onClickHandler: () => {
          console.log('모임 정보가 없습니다.');
        },
      };
    }

    const {
      applyMeetingState,
      cancelMeetingState,
      participateMeetingState,
      leaveMeetingState,
      userStatus,
      // id: meetingId
    } = meeting;

    if (!applyMeetingState && userStatus === '신청전') {
      return {
        text: '신청하기',
        onClickHandler: () => open('APPLY_MEETING_MODAL', { meeting }),
        disable: false,
      };
    }

    if (applyMeetingState && !cancelMeetingState) {
      return {
        text: '신청 중',
        disable: true,
      };
    }

    if (
      applyMeetingState &&
      cancelMeetingState &&
      userStatus !== '신청취소중'
    ) {
      return {
        text: '신청 취소하기',
        onClickHandler: () =>
          open('CANCEL_MEETING_MODAL', {
            statusType: 'applying', // participating
          }),
        disable: false,
      };
    }

    if (
      applyMeetingState &&
      cancelMeetingState &&
      userStatus === '신청취소중'
    ) {
      return {
        text: '신청 취소 대기 중',
        disable: true,
      };
    }

    if (
      participateMeetingState &&
      leaveMeetingState &&
      userStatus !== '중도이탈신청중'
    ) {
      return {
        text: '모임 중도 이탈하기',
        onClickHandler: () =>
          open('CANCEL_MEETING_MODAL', {
            meetingId: meeting.id,
            statusType: 'participating', // applying
          }),
        disable: false,
      };
    }

    if (
      participateMeetingState &&
      leaveMeetingState &&
      userStatus === '중도이탈신청중'
    ) {
      return {
        text: '중도 이탈 신청 중',
        disable: true,
      };
    }

    if (!applyMeetingState && userStatus === '모임완료') {
      return {
        text: '모임 완료',
        disable: true,
      };
    }

    return {
      text: '신청하기',
      onClickHandler: () => open('APPLY_MEETING_MODAL', { meeting }),
      disable: false,
    };
  };

  const {
    text: buttonText,
    onClickHandler,
    disable,
  } = getMeetingButtonProps(meeting, open as () => void);

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

        <Button
          size="lg"
          className="flex-1 gap-1 text-t3 text-white"
          onClick={onClickHandler}
          disabled={disable}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

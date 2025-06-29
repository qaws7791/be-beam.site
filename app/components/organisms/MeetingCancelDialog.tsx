import { useModalStore } from '@/stores/useModalStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../atoms/alert-dialog/AlertDialog';
import toast from 'react-hot-toast';

export default function MeetingCancelDialog() {
  const { isOpen, modalProps, open, close } = useModalStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-t2">
            {modalProps.type === 'participating'
              ? '참여 중인 모임을 중도 이탈할까요?'
              : '신청 중인 모임을 취소할까요?'}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel
            onClick={() =>
              toast(
                modalProps.type === 'participating'
                  ? '모임 중도 이탈 신청을 취소하였습니다.'
                  : '모임 취소 신청을 취소하였습니다.',
              )
            }
          >
            아니요
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                open('CANCEL_MEETING_MODAL', {
                  meetingId: modalProps.meetingId,
                  isCash: modalProps.isCash,
                  type: modalProps.type,
                });
              }}
            >
              네
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

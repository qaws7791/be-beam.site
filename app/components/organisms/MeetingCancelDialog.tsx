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
            참여 중인 모임을 취소할까요?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel
            onClick={() => toast('모임 신청을 취소하지 않았습니다.')}
          >
            아니요
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                open('CANCEL_MEETING_MODAL', {
                  meetingId: modalProps.meetingId,
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

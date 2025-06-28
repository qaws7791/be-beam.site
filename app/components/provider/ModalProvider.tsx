import { useModalStore } from '@/stores/useModalStore';
import MeetingCancelDialog from '../organisms/MeetingCancelDialog';
import MeetingCancelModal from '../organisms/MeetingCancelModal';

const MODAL_COMPONENTS = {
  CANCEL_MEETING_DIALOG: MeetingCancelDialog,
  CANCEL_MEETING_MODAL: MeetingCancelModal,
};

export default function ModalProvider() {
  const { modalType, modalProps, isOpen } = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return <ModalComponent {...modalProps} />;
}

import { useModalStore } from '@/stores/useModalStore';
import ConfirmDialog from '../organisms/ConfirmDialog';
import MeetingCancelModal from '../organisms/MeetingCancelModal';

const MODAL_COMPONENTS = {
  CONFIRM_DIALOG: ConfirmDialog,
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

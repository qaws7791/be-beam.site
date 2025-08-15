import { useModalStore } from '@/stores/useModalStore';
import ConfirmDialog from '../organisms/ConfirmDialog';
import MeetingCancelModal from '../organisms/MeetingCancelModal';
import MeetingReviewEditModal from '../organisms/MeetingReviewEditModal';
import ApplyMeetingModal from '../organisms/ApplyMeetingModal';
import DeclareModal from '../organisms/DeclareModal';
import GuideBooksFilterDialog from '../organisms/GuideBooksFilterDialog';

const MODAL_COMPONENTS = {
  CONFIRM_DIALOG: ConfirmDialog,
  CANCEL_MEETING_MODAL: MeetingCancelModal,
  EDIT_MEETING_REVIEW_MODAL: MeetingReviewEditModal,
  APPLY_MEETING_MODAL: ApplyMeetingModal,
  DECLARE_MODAL: DeclareModal,
  GUIDEBOOK_FILTER_DIALOG: GuideBooksFilterDialog,
};

export default function ModalProvider() {
  const { modalType, modalProps, isOpen } = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return <ModalComponent {...modalProps} />;
}

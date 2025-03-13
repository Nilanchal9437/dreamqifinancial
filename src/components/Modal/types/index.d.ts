interface ModalType {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  onNext?: () => void;
  secondaryText: string;
  maxWidth: string;
  nextButtonText?: string;
  cancelButtonText?: string;
  load?: boolean;
}

export default ModalType;

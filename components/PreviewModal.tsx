"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PreviewModalProps {
  open: boolean;
  data: any;
  onClose: () => void;
}

const PreviewModal = ({ open, data, onClose }: PreviewModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <div className="">dajke</div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;

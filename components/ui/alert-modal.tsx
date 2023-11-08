"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({ open, onConfirm, onClose, loading }: AlertModalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <div className=" ">
      <Dialog open={open} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>

            <div className=" flex justify-end gap-3">
              <Button variant={"outline"} disabled={loading} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant={"destructive"}
                disabled={loading}
                onClick={onConfirm}
              >
                Continue
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertModal;

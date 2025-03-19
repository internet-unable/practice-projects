import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface IPropsCustomDialog {
  title: string;
  dialogOpen: boolean;
  children?: React.ReactNode;
  onOpen: () => void;
  onClose: () => void;
}

const CustomDialog: React.FC<IPropsCustomDialog> = ({
  onOpen,
  onClose,
  title,
  dialogOpen,
  children,
}) => {
  return (
    <Dialog open={dialogOpen}>
      <DialogContent
        onClose={onClose}
        className="max-w-[335px] bg-[var(--white)] rounded-[var(--default-round)] min-h-[175px] top-[25%] p-4 pt-14 desktop:min-w-[630px] desktop:min-h-[278px]"
      >
        <DialogHeader className="desktop:justify-center">
          <DialogTitle className="desktop:text-center ">{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 mt-3 desktop:flex-col desktop:justify-start  desktop:mt-0">
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;

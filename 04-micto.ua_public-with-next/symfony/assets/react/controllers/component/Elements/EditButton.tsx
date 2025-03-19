import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IPropsEditButton {
  className?: string;
}

const EditButton: React.FC<IPropsEditButton> = ({ className }) => {
  return (
    <Button
      variant="edit"
      className={cn(
        "flex items-center justify-start gap-2 w-[259px] h-6 p-0",
        className,
      )}
    >
      <img
        src="/img/cabinet/edit.svg"
        alt="edit"
        className="h-[18px] w-[18px]"
      />
      <span className="fontMedium text-[16px] text-[var(--color10)] desktop:fontMediumRegular">
        Редагувати
      </span>
    </Button>
  );
};

export default EditButton;

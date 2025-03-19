import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IPropsAddButton {
  title: string;
  className?: string;
  onClick?: () => void;
}

const AddCustomButton: React.FC<IPropsAddButton> = ({
  title,
  className,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "text-[var(--color5)] rounded-[var(--default-round)] border border-[var(--color5)]" +
          " bg-[var(--white)] fontMedium !text-[16px] hover:!bg-primary-hover ",
        className,
      )}
    >
      <img src="/img/cabinet/blue-plus.svg" alt="plus" />
      {title}
    </Button>
  );
};

export default AddCustomButton;

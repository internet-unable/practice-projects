import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  imgBage?: string;
  title?: string;
  isVerified?: string;
  className?: string;
}

const BageSwitcher: React.FC<Props> = ({
  imgBage,
  title,
  className,
  isVerified,
}) => {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-[var(--default-round)] bg-[#AADD771A] w-[126px] px-2 py-1 ",
        className,
      )}
    >
      <img src="/img/bage-success.svg" alt="bage-success" />
      <span className="text-[#AADD77] fontRegular2Bold !text-[14px] !leading-5">
        Перевірено
      </span>
    </div>
  );
};

export default BageSwitcher;

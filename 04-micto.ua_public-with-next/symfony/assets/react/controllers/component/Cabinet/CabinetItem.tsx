import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface IPropItemCabinet {
  imgUrl: string;
  title: string;
  linkUrl: string;
  className?: string;
  customStyle?: string;
  children: React.ReactNode;
}

const CabinetItem: React.FC<IPropItemCabinet> = ({
  imgUrl,
  linkUrl,
  title,
  className,
  customStyle,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-[var(--default-round)] transition ease-linear delay-75 group" +
          " shadow-cabinet desktop:shadow-cabinet-desktop desktop:hover:shadow-cabinet-hover desktop:w-[calc(33.33%-20px)]",
        className
      )}
    >
      <Link
        to={linkUrl}
        className={
          "text-[var(--color10)] hover:text-[var(--color10)] px-4 py-[14px] flex items-center gap-3 w-full desktop:gap-[34px] desktop:px-[32px] desktop:py-[22px] desktop:hover:text-[var(--color5)] transition ease-linear delay-75 " +
          customStyle
        }
      >
        <div className="desktop:p-[12px] desktop:bg-[var(--color24)] desktop:rounded-[var(--default-round)] shrink-0">
          <div className="flex items-center justify-center desktop:h-[32px] desktop:w-[32px] desktop:p-[3.25px]">
            {children}
          </div>
        </div>

        <span className={cn("fontMedium desktop:fontUbuntuMedium")}>
          {title}
        </span>
      </Link>
    </div>
  );
};

export default CabinetItem;

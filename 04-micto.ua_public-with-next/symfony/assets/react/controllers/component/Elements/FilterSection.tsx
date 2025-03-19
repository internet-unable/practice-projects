import React from "react";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FilterSection: React.FC<IProps> = ({ className, title, children }) => {
  return (
    <div className={cn("mt-6", className)}>
      <span className="fontRegular2Bold text-[var(--color10)]">{title}</span>
      <hr className="mt-1" />
      <div className="flex flex-col gap-4 mt-5">{children}</div>
    </div>
  );
};

export default FilterSection;

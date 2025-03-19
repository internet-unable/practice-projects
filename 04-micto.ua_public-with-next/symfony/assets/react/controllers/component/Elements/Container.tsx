import React from "react";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("mx-auto max-w-[1290px]", className)}>{children}</div>
  );
};

export default Container;

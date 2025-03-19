import { VARNING_SVG } from "@/components/utils/SVG";
import React from "react";

interface Props {
  textError: string;
}

const ErrorInfo: React.FC<Props> = ({ textError }) => {
  return (
    <div className="flex items-start w-full gap-2 px-[16px] py-[7.5px] rounded-[8px] border-[1px] border-solid border-[var(--error)] text-[var(--error)] bg-[var(--bgError)] fontRegular">
      <VARNING_SVG />
      {textError}
    </div>
  );
};

export default ErrorInfo;

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface IPropsCustomSwitch {
  label: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  onCheckedChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomSwitch: React.FC<IPropsCustomSwitch> = ({
  label,
  className,
  disabled,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className={cn("flex gap-[8px]", className)}>
      <Switch
        className=""
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label className="fontRegular2 text-[#6B7280]">{label}</Label>
    </div>
  );
};

export default CustomSwitch;

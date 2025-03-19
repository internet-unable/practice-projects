import React from "react";
import { cn } from "@/lib/utils";
import { RadioGroup } from "@/components/ui/radio-group";

interface IProps {
  className?: string;
}

const CustomRadioGrup: React.FC<IProps> = ({ className }) => {
  return <RadioGroup defaultValue="comfortable"></RadioGroup>;
};

export default CustomRadioGrup;

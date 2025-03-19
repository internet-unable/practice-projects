import React from "react";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface IPropsTimeInput {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TimeInput: React.FC<IPropsTimeInput> = ({ value, onChange }) => {
  return (
    <Input
      className="p-0 text-center justify-center fontRegular2 text-[var(--color10)] rounded-[var(--default-round)] h-[48px] w-[85px] autofill:bg-transparent placeholder:text-[var(--gray2)] bg-white"
      type="time"
      placeholder="00:00"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

type Props<T extends FieldValues> = {
  control?: Control<T>;
  name?: Path<T>;
  className?: string;
  isRoundTheClock?: boolean;
};

export const TimeInputControll = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TimeInput
          className={rest.className}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default TimeInput;

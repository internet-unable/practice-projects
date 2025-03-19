import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import ErrorInfo from "./ErrorInfo";

interface IPropsInputArea {
  label?: string;
  placeholder: string;
  className?: string;
  classNameLabel?: string;
  value?: string;
  onChange?: (...event: any[]) => void;
  error?: FieldError;
}

const InputArea: React.FC<IPropsInputArea> = ({
  label,
  placeholder,
  className,
  classNameLabel,
  onChange,
  value,
  error,
}) => {
  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      {label && (
        <Label
          className={cn("fontRegular2 text-[var(--color10)]", classNameLabel)}
        >
          {label}
        </Label>
      )}

      <Textarea
        className={
          "fontRegular2 mt-1 text-[var(--color10)] rounded-[var(--default-round)] h-[176px] autofill:bg-transparent placeholder:text-[var(--gray2)] placeholder:fontRegular2 bg-white" +
          (!!error
            ? " border-[var(--error)] text-[var(--error)] placeholder:text-[var(--error)]"
            : "")
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!!error && <ErrorInfo textError={error.message} />}
    </div>
  );
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
  classNameLabel?: string;
};

export const CustomAreaControll = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputArea
          label={rest.label}
          placeholder={rest.placeholder}
          className={rest.className}
          classNameLabel={rest.classNameLabel}
          value={value}
          onChange={onChange}
          error={error}
        />
      )}
    />
  );
};

export default InputArea;

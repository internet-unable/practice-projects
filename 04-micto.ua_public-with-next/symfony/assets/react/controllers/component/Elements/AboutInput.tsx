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

interface IPropsAboutInput {
  label?: string;
  placeholder: string;
  className?: string;
  value?: string | number;
  onChange?: (...event: any[]) => void;
  error?: FieldError;
}

const AboutInput: React.FC<IPropsAboutInput> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      {!!label && (
        <Label className="fontUbuntu20Bold !text-[20px] text-[var(--color10)]">
          {label}
        </Label>
      )}
      <div className="desktop:p-6 w-full bg-white rounded-[var(--default-round)]">
        <Textarea
          className={
            "bg-white fontRegular2 text-[var(--color10)] rounded-[var(--default-round)] h-[100px] autofill:bg-transparent placeholder:text-[var(--gray2)]" +
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
    </div>
  );
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
};

export const AboutInputControll = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AboutInput
          label={rest.label}
          placeholder={rest.placeholder}
          className={rest.className}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default AboutInput;

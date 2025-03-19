import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEARCH_SVG } from "@/components/utils/SVG";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { useMedia } from "react-use";
import ErrorInfo from "./ErrorInfo";

interface IPropsCustomInput {
  label?: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  value?: string | number;
  isSearchIcon?: boolean;
  onChange?: (...event: any[]) => void;
  error?: FieldError;
}

const CustomInput: React.FC<IPropsCustomInput> = ({
  label,
  value,
  placeholder,
  type = "text",
  className,
  onChange,
  isSearchIcon,
  error,
}) => {
  const isMedia991 = useMedia("(min-width: 991px)");
  return (
    <div className={cn("relative flex flex-col items-start gap-2", className)}>
      <Label
        className="fontRegular2 text-[var(--color10)]"
        htmlFor={placeholder}
      >
        {label}
      </Label>
      <Input
        className={
          `fontRegular2 text-[var(--color10)] rounded-[var(--default-round)] h-11 autofill:bg-transparent placeholder:text-[var(--gray2)] bg-white desktop:h-[50px] ${
            isSearchIcon && "desktop:pl-10"
          }` +
          (!!error
            ? " border-[var(--error)] text-[var(--error)] placeholder:text-[var(--error)]"
            : "")
        }
        value={value}
        id={placeholder}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
      {!!error && <ErrorInfo textError={error.message} />}

      {isMedia991 && isSearchIcon && (
        <span className="absolute left-[15px] top-[15px]">
          <SEARCH_SVG />
        </span>
      )}
    </div>
  );
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
};

export const CustomInputControll = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomInput
          label={rest.label}
          placeholder={rest.placeholder}
          type={rest.type}
          className={rest.className}
          value={value}
          onChange={onChange}
          error={error}
        />
      )}
    />
  );
};

export default CustomInput;

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  id: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  customOnChange?: Function;
  value?: string;
};

export default function Textarea({
  label,
  id,
  placeholder,
  customOnChange,
  value,
}: Props) {
  return (
    <div className="input-wrapper">
      {label && (
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <textarea
        value={value ? value : ""}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (customOnChange) {
            customOnChange(e);
          }
        }}
      />
    </div>
  );
}

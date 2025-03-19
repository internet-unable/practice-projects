import React, { ChangeEventHandler } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: string;
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  customClass?: string;
  customOnChange?: Function;
  value?: string | number | readonly string[] | undefined;
  error?: string;
};

export default function Input({
  label,
  type,
  id,
  placeholder,
  customClass,
  customOnChange,
  value,
  error,
  name,
}: Props) {
  return (
    <div className={`input-wrapper ${customClass ? customClass : ""}`}>
      {label && (
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          customOnChange(e);
        }}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

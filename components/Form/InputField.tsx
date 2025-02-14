import clsx from "clsx";
import { HTMLInputAutoCompleteAttribute, useEffect } from "react";
import { Control, FieldValues, useController } from "react-hook-form";

type Props = {
  id: string;
  name: string;
  control: Control<FieldValues>;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  theme?: "light" | "dark";
  size?: "md" | "lg";
  placeholder?: string;
  type?: "text" | "email" | "password" | "date";
  error?: string;
  disabled?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

export default function Input({
  id,
  label,
  control,
  placeholder,
  required,
  defaultValue,
  theme = "light",
  size = "md",
  type = "text",
  error,
  name,
  disabled,
  autoComplete,
}: Props) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  useEffect(() => {
    console.log("firing useEffect from InputField");
    if (defaultValue) {
      field.onChange(defaultValue);
    }
  }, [defaultValue, field]);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className={clsx("label", {
            "text-slate-400": theme === "dark",
            "after:ml-0.5 after:text-rose-500 after:content-['*']": required,
            "!text-slate-500 after:!text-slate-500": disabled,
          })}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        {...field}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={clsx("input peer", {
          "ring-rose-500 focus:ring-rose-500": error,
          "text-slate-400 ring-border focus:text-slate-100 focus:ring-border":
            theme === "dark",
          "text-slate-500": disabled,
          "text-slate-900 ring-slate-300 focus:ring-slate-500":
            theme === "light",
          "p-2": size === "md",
          "p-3": size === "lg",
        })}
        placeholder={placeholder}
      />
    </div>
  );
}

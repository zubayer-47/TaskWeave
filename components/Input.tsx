import clsx from "clsx";
import Link from "next/link";
import { HTMLInputAutoCompleteAttribute, useState } from "react";

type Props = {
  id: string;
  name: string;
  label?: string;
  hint?: string;
  required?: boolean;
  defaultValue?: string;
  theme?: "light" | "dark";
  size?: "md" | "lg";
  forgot_password?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "password" | "date";
  error?: string;
  disabled?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

export default function Input({
  id,
  label,
  placeholder,
  hint,
  required,
  defaultValue = "",
  theme = "light",
  size = "md",
  forgot_password,
  type = "text",
  error,
  name,
  disabled,
  autoComplete,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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
        name={name}
        // value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
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

      {forgot_password && (
        <Link
          href="/forgot-password"
          className="font-noto-sans text-sm font-medium tracking-wide text-primary-foreground transition-all duration-200 hover:text-primary-foreground/80"
        >
          Forgot password?
        </Link>
      )}
      {error && <p className="error">{error}</p>}

      {hint && (
        <p className="hidden text-sm text-slate-500 peer-focus:block peer-focus:animate-fadeIn">
          {hint}
        </p>
      )}
    </div>
  );
}

import clsx from "clsx";
import Link from "next/link";
import { HTMLInputAutoCompleteAttribute, useState } from "react";

type Props = {
  id: string;
  name: string;
  label?: string;
  hint?: string;
  required?: boolean;
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
  forgot_password,
  type = "text",
  error,
  name,
  disabled,
  autoComplete,
}: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-2 space-y-1">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={clsx("input peer", {
          "ring-rose-500 focus:ring-rose-500": error,
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
        <p className="peer-focus:animate-fadeIn hidden text-sm text-slate-500 peer-focus:block">
          {hint}
        </p>
      )}
    </div>
  );
}

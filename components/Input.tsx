import { HTMLInputAutoCompleteAttribute, useState } from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
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
  required,
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
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className="input"
        placeholder={placeholder}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

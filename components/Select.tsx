import { useState } from "react";

type Props = {
  id: string;
  label: string;
  required: boolean;
  children?: React.ReactNode;
  error?: string;
  name?: string;
  disabled?: boolean;
};

export default function Select({
  id,
  label,
  required,
  children,
  error,
  name,
  disabled,
}: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-2 space-y-1">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className="input"
      >
        {children}
      </select>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

import { useState } from "react";

type Props = { name: string };
export default function MultiEmailInput({ name }: Props) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!emails.includes(inputValue.trim())) {
        setEmails([...emails, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <div className="mt-1 w-full max-w-full space-y-1">
      <label htmlFor="email" className="label">
        Assignees
      </label>
      <div className="flex flex-wrap gap-2 rounded-lg border p-2 transition-all focus-within:ring-2 focus-within:ring-slate-500">
        {emails.map((email) => (
          <span
            key={email}
            className="flex items-center gap-2 rounded-lg bg-blue-100 px-2 py-1 text-sm text-blue-700"
          >
            {email}
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeEmail(email)}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          id="email"
          type="email"
          className="input border-none ring-0 focus:outline-none focus:ring-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type email and press enter"
        />

        <input type="hidden" name={name} value={emails.join(",")} />
      </div>
    </div>
  );
}

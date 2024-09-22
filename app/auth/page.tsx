"use client";

import React from "react";
import { useFormState } from "react-dom";

export default function Auth() {
  const [formState, action] = useFormState(
    (_state: unknown, formData: FormData) => {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      console.log({ data });
    },
    undefined,
  );

  console.log({ formState });

  return (
    <div className="flex flex-col gap-7 items-center h-screen select-none pt-44">
      <div className="text-center space-y-5">
        <h1 className="text-primary-foreground font-adlam-display text-6xl">
          Sign In
        </h1>

        <span className="font-adlam-display text-xl">
          Authenticate to manage your project efficiently
        </span>
      </div>
      <span className="font-adlam-display text-xl">Sign In with Google</span>

      <div>
        <form action={action}>
          <input name="email" type="email" />
          <input name="password" type="password" />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </div>
  );
}

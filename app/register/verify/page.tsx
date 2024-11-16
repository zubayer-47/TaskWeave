"use client";

import Input from "@/components/Input";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Verify() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      code: formData.get("code") as string,
    };

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(
          JSON.stringify(completeSignUp, null, 2),
          "---register-verification-not-complete",
        );
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="auth_parent">
        <div className="text-center">
          <h1 className="title text-4xl">Verify Account</h1>

          <h3 className="font-adlam-display text-base text-slate-500 md:text-xl">
            Check your mail and enter the verification code
          </h3>
        </div>
        <div>
          <form onSubmit={handleVerify} className="flex flex-col gap-2">
            <Input
              id="code"
              label="Code"
              name="code"
              type="text"
              required
              placeholder="Write your code"
            />

            <button
              type="submit"
              className="mt-2 rounded-lg bg-primary-foreground py-2.5 font-adlam-display text-lg text-gray-50 transition-colors hover:bg-primary-foreground/70"
            >
              {" "}
              Submit{" "}
            </button>
          </form>
          <Link
            href="/register"
            className="mt-2 block text-center font-inter font-bold text-primary-foreground underline underline-offset-4 transition-colors hover:text-primary-foreground/70"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

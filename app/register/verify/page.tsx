"use client";

import Input from "@/components/Input";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

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
      const completeSignUp = await toast.promise(
        signUp.attemptEmailAddressVerification({
          code: data.code,
        }),
        {
          error: (err) => err?.errors[0].message || "Something went wrong",
          loading: "Verifying...",
          success: "Account verified successfully",
        },
      );

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
          <h1 className="title">Verify Account</h1>

          <h3 className="sub-title">
            Check your mail and enter the verification code
          </h3>
        </div>
        <div className="w-full">
          <form onSubmit={handleVerify} className="flex flex-col gap-2">
            <Input
              id="code"
              name="code"
              type="text"
              required
              placeholder="Write your code"
            />

            <button type="submit" className="auth-btn">
              {" "}
              Submit{" "}
            </button>
          </form>
          <Link href="/register" className="text-btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

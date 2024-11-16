"use client";

import Input from "@/components/Input";
import { Gender } from "@/lib/auth/types";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Register() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      fullname: formData.get("fullname") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      gender: formData.get("gender") as Gender,
    };

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        username: data.username,
        // firstName: data.fullname,
        emailAddress: data.email,
        password: data.password,
      });

      // send mail
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);

      router.push("/register/verify");
    } catch (err: any) {
      console.log({ err }, "register");
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
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
          <h1 className="title">Sign Up</h1>

          <h3 className="font-adlam-display text-base text-slate-500 md:text-xl">
            Authenticate to manage your project efficiently
          </h3>
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
              id="fullname"
              label="Full Name"
              name="fullname"
              type="text"
              required
              placeholder="your fullname"
            />
            <Input
              id="username"
              label="Username"
              name="username"
              type="text"
              required
              placeholder="your username"
            />
            <Input
              id="email"
              label="Email"
              name="email"
              type="email"
              required
              placeholder="your email"
            />
            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              required
              placeholder="your password"
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
            href="/login"
            className="mt-2 block text-center font-inter font-bold text-primary-foreground underline underline-offset-4 transition-colors hover:text-primary-foreground/70"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

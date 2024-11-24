"use client";

import Input from "@/components/Input";
import { Gender } from "@/lib/auth/types";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const { isLoaded, signUp } = useSignUp();
  const [passErr, setPassErr] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("cpassword") as string,
      gender: formData.get("gender") as Gender,
    };

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setPassErr("Passwords do not match");
      return;
    }

    setPassErr("");

    if (!isLoaded) {
      return;
    }

    try {
      await toast.promise(
        signUp.create({
          // fullName: data.fullname,
          username: data.username,
          // firstName: data.fullname,
          emailAddress: data.email,
          password: data.password,
        }),
        {
          error: (err) => err?.errors[0].message || "Something went wrong",
          loading: "Creating account...",
          success: "Now, Verify your account!",
        },
      );

      // send mail
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // setVerifying(true);

      router.push("/register/verify");
    } catch (err: any) {
      console.log({ err }, "register_error");
      // toast.error(err?.errors[0].message);
      // setClerkError(err.errors[0].message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="auth_parent">
        <div className="text-center">
          <h1 className="title">Sign Up</h1>

          <h3 className="sub-title">
            Authenticate to manage your project efficiently
          </h3>
        </div>
        <div className="w-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
              id="first_name"
              // label="Full Name"
              name="first_name"
              type="text"
              required
              placeholder="First Name"
            />
            <Input
              id="last_name"
              // label="Full Name"
              name="last_name"
              type="text"
              required
              placeholder="Last Name"
            />
            <Input
              id="username"
              // label="Username"
              name="username"
              type="text"
              required
              placeholder="Username"
              autoComplete="off"
              hint="Username can only contain letters, numbers and '_' or '-'."
            />
            <Input
              id="email"
              // label="Email"
              name="email"
              type="email"
              required
              placeholder="Email"
            />
            <Input
              id="password"
              // label="Password"
              name="password"
              type="password"
              required
              placeholder="Password"
              error={passErr}
            />
            <Input
              id="cpassword"
              // label="Password"
              name="cpassword"
              type="password"
              required
              placeholder="Confirm Password"
              error={passErr}
            />

            <button type="submit" className="auth-btn">
              {" "}
              Submit{" "}
            </button>
          </form>
          <Link href="/login" className="text-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

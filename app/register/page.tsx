"use client";

import Input from "@/components/Input";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

function Register() {
  const { register, loading } = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullname: formData.get("fullname"),
    };

    register(
      data.email as string,
      data.password as string,
      data.fullname as string,
    );
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="flex h-screen select-none flex-col items-center justify-center gap-7 pb-20">
        <div className="space-y-2 text-center">
          <h1 className="font-adlam-display text-6xl text-primary-foreground">
            Sign Up
          </h1>

          <h3 className="font-adlam-display text-xl">
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
              placeholder="your fullname"
            />
            <Input
              id="email"
              label="Email"
              name="email"
              type="email"
              placeholder="your email"
            />
            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
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
    </>
  );
}

export default Register;

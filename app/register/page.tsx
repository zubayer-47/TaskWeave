"use client";

import Input from "@/components/Input";
import { useRegisterMutation } from "@/lib/auth/authApi";
import { Gender } from "@/lib/auth/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Register() {
  const [register] = useRegisterMutation();
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

    try {
      await register(data).unwrap();

      router.push("/dashboard");

      toast.success("Login successful", {
        style: {
          background: "rgb(16, 185, 129)",
          color: "#fff",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if ("data" in error) {
        if ("message" in error.data) {
          toast.error(error.data.message, {
            style: {
              background: "rgb(239, 68, 68)",
              color: "#fff",
            },
          });
        }
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="auth_parent">
        <div className="space-y-2 text-center">
          <h1 className="title">Sign Up</h1>

          <h3 className="font-adlam-display text-base md:text-xl">
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

"use client";

import Input from "@/components/Input";
import { useSignIn } from "@clerk/clerk-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Login() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    const data = {
      // fullname: formData.get("fullname") as string,
      username: formData.get("username") as string,
      // email: formData.get("email") as string,
      password: formData.get("password") as string,
      // gender: formData.get("gender") as Gender,
    };

    try {
      const res = await toast.promise(
        signIn.create({
          identifier: data.username,
          password: data.password,
        }),
        {
          error: (err) => err?.errors[0].message || "Something went wrong",
          loading: "Signing in...",
          success: "Signed in successfully",
        },
      );

      if (res.status === "complete") {
        await setActive({
          session: res.createdSessionId,
        });
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // toast.error(err.errors[0].message);
      console.log({ err }, "login_error");
      // setClerkError(err.errors[0].message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="auth_parent">
        <div className="text-center">
          <h1 className="title">Sign In</h1>

          <h3 className="sub-title">
            Authenticate to manage your project efficiently
          </h3>
        </div>
        {/* <span className='font-adlam-display text-xl'>Sign In with Google</span> */}

        <div className="w-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
              name="username"
              placeholder="Username"
              required
              id="username"
              // label="Username"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              id="password"
              forgot_password
              // label="Password"
            />

            <button type="submit" className="auth-btn">
              Submit
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

export default Login;

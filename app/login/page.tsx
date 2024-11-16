"use client";

import Input from "@/components/Input";
import Link from "next/link";

function Login() {
  // const [login] = useLoginMutation();
  // const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const data = {
    //   username: formData.get("username"),
    //   password: formData.get("password"),
    // };

    // try {
    // await login({
    //   username: data.username as string,
    //   password: data.password as string,
    // }).unwrap();

    // router.push("/dashboard");

    // toast.success("Login successful", {
    //   style: {
    //     background: "rgb(16, 185, 129)",
    //     color: "#fff",
    //   },
    // });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   if ("data" in error) {
    //     if ("message" in error.data) {
    //       toast.error(error.data.message, {
    //         style: {
    //           background: "rgb(239, 68, 68)",
    //           color: "#fff",
    //         },
    //       });
    //     }
    //   }
    // }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="auth_parent">
        <div className="text-center">
          <h1 className="title">Sign In</h1>

          <h3 className="font-adlam-display text-base text-slate-500 md:text-xl">
            Authenticate to manage your project efficiently
          </h3>
        </div>
        {/* <span className='font-adlam-display text-xl'>Sign In with Google</span> */}

        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
              name="username"
              placeholder="your username"
              required
              id="username"
              label="Username"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              id="password"
              label="Password"
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

export default Login;

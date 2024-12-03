"use client";

import Input from "@/components/Input";
import taskweave_cover from "@/public/taskweave-cover.png";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, isSignedIn, isLoaded } = useUser();
  // useStoreUserEffect();

  // const storeUser = useMutation(api.users.store);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedIn || !isLoaded) {
      toast.error("something went wrong!");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;
    // const email = formData.get("email") as string;
    const gender = formData.get("gender") as string;
    const bio = formData.get("bio") as string;

    try {
      await toast.promise(
        user.update({
          firstName,
          lastName,
          unsafeMetadata: {
            gender: gender.toUpperCase(),
            bio,
          },
        }),
        {
          error: (err) => err?.errors[0].message || "Something went wrong",
          loading: "Updating...",
          success: "Updated successfully",
        },
      );

      // await storeUser();
    } catch (error) {
      console.log(error, "profile_error");
    }
  };

  return (
    <section id="profile" className="overflow-y-auto pb-10">
      <Image
        src={taskweave_cover}
        width={1000}
        height={1000}
        className="max-h-72 w-full object-cover"
        alt="Dashboard Feature Image"
        priority
      />

      <div className="px-32">
        <div className="-mt-16 flex items-center gap-4">
          <Image
            src={user?.imageUrl || "/zubayer.jpg"}
            width={200}
            height={200}
            className="h-52 w-52 rounded-full object-cover"
            alt="Dashboard Feature Image"
            priority
          />

          <div className="mt-10">
            <h1 className="font-noto-sans text-4xl font-bold text-slate-100">
              {user?.fullName || "Unknown"}
            </h1>
            <h2 className="font-noto-sans text-2xl font-semibold text-slate-400">
              {user?.username || "Unknown"}
            </h2>
          </div>
        </div>

        <div className="mt-14">
          <h1 className="font-noto-sans text-4xl font-bold text-slate-100">
            Personal Information
          </h1>
          <hr className="my-2 w-32 border-b border-border" />

          <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-2 gap-5">
            <Input
              id="firstname"
              label="First Name"
              placeholder="First Name"
              type="text"
              name="firstname"
              required
              theme="dark"
              size="lg"
              defaultValue={user?.firstName}
            />
            <Input
              id="lastname"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              name="lastname"
              required
              theme="dark"
              size="lg"
              defaultValue={user?.lastName}
            />
            <Input
              id="email"
              label="Email"
              placeholder="example@me.com"
              type="email"
              name="email"
              required
              theme="dark"
              size="lg"
              disabled
              defaultValue={user?.emailAddresses[0].emailAddress}
            />

            <div>
              <label
                htmlFor="countries"
                className={clsx(
                  "mb-2 block text-sm font-medium text-slate-400",
                  "label",
                )}
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="input p-3 text-slate-400 ring-1 ring-border"
                defaultValue={
                  (user?.unsafeMetadata?.gender as string) || "FEMALE"
                }
              >
                {/* <option selected>Choose a gender</option> */}
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </select>
            </div>

            <div className="col-span-full">
              <Input
                id="bio"
                label="Bio"
                placeholder="Bio"
                type="text"
                name="bio"
                required
                theme="dark"
                size="lg"
                defaultValue={user?.unsafeMetadata.bio as string}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className={clsx("button px-4 py-2", "rounded-[1.3rem]")}
              >
                Save
              </button>
              <button
                type="button"
                className={clsx(
                  "button px-4 py-2",
                  "rounded-[1.3rem] bg-red hover:bg-red/70",
                )}
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

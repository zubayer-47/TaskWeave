"use client";

import Input from "@/components/Input";
import taskweave_cover from "@/public/taskweave-cover.png";
import clsx from "clsx";

import Image from "next/image";

export default function Profile() {
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
            src="/zubayer.jpg"
            width={200}
            height={200}
            className="h-52 w-52 rounded-full object-cover"
            alt="Dashboard Feature Image"
            priority
          />

          <div className="mt-10">
            <h1 className="font-noto-sans text-4xl font-bold text-slate-100">
              A B M Zubayer
            </h1>
            <h2 className="font-noto-sans text-2xl font-semibold text-slate-400">
              @zdevp
            </h2>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-noto-sans text-4xl font-bold text-slate-100">
            Personal Information
          </h1>
          <hr className="my-2 w-32 border-b border-border" />

          <div className="mt-10 grid grid-cols-2 gap-5">
            <Input
              id="firstname"
              label="First Name"
              placeholder="First Name"
              type="text"
              name="firstname"
              required
              theme="dark"
              size="lg"
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
                id="countries"
                className="input p-3 text-slate-400 ring-1 ring-border"
              >
                <option selected>Choose a country</option>
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
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
          </div>
        </div>
      </div>
    </section>
  );
}

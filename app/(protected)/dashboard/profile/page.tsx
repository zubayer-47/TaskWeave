"use client";

import Input from "@/components/Input";
import taskweave_cover from "@/public/taskweave-cover.png";

import Image from "next/image";

export default function Profile() {
  return (
    <section id="profile" className="overflow-y-auto">
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
            <h1 className="font-catamaran text-4xl font-bold text-slate-100">
              A B M Zubayer
            </h1>
            <h2 className="font-catamaran text-2xl font-semibold text-slate-300">
              @zdevp
            </h2>
          </div>
        </div>

        <div className="mt-16">
          <h1 className="font-catamaran text-4xl font-bold text-slate-100">
            Personal Information
          </h1>
          <hr className="my-2 w-32 border-b border-border" />

          <div className="grid grid-cols-2 gap-10">
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
          </div>
        </div>
      </div>
    </section>
  );
}

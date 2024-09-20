import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-7 justify-center items-center h-screen select-none">
      <div className="text-center space-y-2">
        <h1 className="text-primary-foreground font-adlam-display text-6xl">
          Welcome to TaskWeave
        </h1>

        <span className="font-adlam-display text-xl">
          {" "}
          Manage All of Your Projects Here{" "}
        </span>
      </div>

      <button
        type="button"
        className="bg-primary-foreground hover:bg-primary-foreground/70 transition-colors px-5 py-3 rounded-lg text-gray-50 font-adlam-display text-xl mb-5"
      >
        Get Started
      </button>

      <div className="flex items-center">
        <div className="rounded-2xl relative w-[31.25rem] h-[22.1875rem]">
          <Image
            src="/Dashboard.png"
            width={500}
            height={355}
            className="rounded-2xl shadow-2xl"
            alt="Dashboard Feature Image"
          />
          <div className="absolute size-full inset-0 rounded-2xl bg-gray-900/40"></div>
        </div>
        <div className="rounded-2xl relative w-[31.25rem] h-[22.1875rem] mb-14 -ml-56">
          <Image
            src="/Dashboard.png"
            width={500}
            height={355}
            className="rounded-2xl shadow-2xl"
            alt="Dashboard Feature Image"
            // priority
          />
          <div className="absolute size-full inset-0 rounded-2xl bg-gray-900/40"></div>
        </div>
      </div>
    </div>
  );
}

import clsx from "clsx";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className={clsx("title", "!text-rose-600")}>Not Found</h1>
      <p className="font-adlam-display text-xl">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="mt-5 rounded-md bg-rose-600 p-3 text-white transition-all hover:bg-rose-500"
      >
        Return Home
      </Link>
    </div>
  );
}

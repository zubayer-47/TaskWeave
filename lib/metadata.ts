import { Metadata } from "next";

export function constructMetadata({
  title = "Welcome to TaskWeave",
  description = "TaskWeave simplifies our task management process.",
  image = "/task-weave-logo.png",
  icons = "/taskweave-favicon.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@zubayerDev",
    },
    icons,
    metadataBase: new URL("https://task-weave.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

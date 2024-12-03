// import { decrypt } from "@/app/lib/session";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRouteMatcher = createRouteMatcher([
  "/",
  "/login",
  "/register(.*)",
  "/forgot-password(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionId } = await auth();
  const path = req.nextUrl.pathname;
  const isAccessingPrivateRoute = path.startsWith("/dashboard");

  console.log({ matcher: publicRouteMatcher(req), path, userId, sessionId });

  if (!userId && !publicRouteMatcher(req)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (userId && publicRouteMatcher(req) && !isAccessingPrivateRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

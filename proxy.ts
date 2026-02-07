import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

function redirectToSignIn(req: NextRequest) {
  const signInUrl = new URL("/auth/signin", req.url);
  signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);

  return NextResponse.redirect(signInUrl);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public files, API routes, and auth pages
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health-check") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirectToSignIn(req);

  return NextResponse.next();
}

// Protect everything under the root page
export const config = {
  matcher: ["/:path*"],
};

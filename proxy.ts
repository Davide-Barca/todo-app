import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public files, API routes, and auth pages
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api-health") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/public")
  ) {
    console.log("proxy: Public path, allowing:", pathname);
    return NextResponse.next();
  }

  // Define redirect URL
  const signInURL = new URL("/signin", req.url);
  signInURL.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);

  // Verify session by calling the BetterAuth session endpoint on the server.

  // Redirect to /signin page
  return NextResponse.redirect(signInURL);
}

// Protect everything under the root page
export const config = {
  matcher: ["/", "/component-example"],
};

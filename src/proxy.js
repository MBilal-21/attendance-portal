// /src/proxy.js
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // PUBLIC ROUTES (skip auth)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Read token from cookie
  const token = req.cookies.get(process.env.COOKIE_NAME || "token")?.value;

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded = verifyToken(token);
    const role = decoded.role;

    // ROLE BASED DASHBOARD PROTECTION
    if (pathname.startsWith("/admin") && role !== "admin") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/teacher") && role !== "teacher") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/student") && role !== "student") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Allow access
    const response = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });

    // Pass user info in headers (optional)
    response.headers.set("x-user-id", decoded.id);
    response.headers.set("x-user-role", role);

    return response;
  } catch (err) {
    // Invalid token → redirect to login
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

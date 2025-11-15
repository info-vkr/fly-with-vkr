import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("adminToken")?.value;

  // If no token and trying to access /admin pages (except login)
  if (!token && request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],  // Protect all /admin routes
};

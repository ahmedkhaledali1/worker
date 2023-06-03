import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  if (!session) {
    if (pathname === "/" || pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  if (session) {
    if (pathname.includes("/auth") || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/dashboard"],
};

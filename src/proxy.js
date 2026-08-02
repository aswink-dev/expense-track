import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(request) {
  console.log("🔥🔥 PROXY IS RUNNING");

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/expenses/:path*",
  ],
};
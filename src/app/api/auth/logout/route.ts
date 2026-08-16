import { NextResponse, NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logout berhasil" });

  // Clear the JWT cookie
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Expire immediately
    path: "/",
  });

  return response;
}

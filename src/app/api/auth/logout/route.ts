import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logout successful" });
    
    // Clear any auth cookies
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    
    response.cookies.set("session", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Check if auth cookie exists
  const cookieHeader = request.headers.get('cookie');
  const hasAuthCookie = cookieHeader?.includes('auth-token=authenticated');
  
  if (!hasAuthCookie) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ authenticated: true });
}

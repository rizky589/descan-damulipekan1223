import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production"
);

const COOKIE_NAME = "auth-token";
const TOKEN_EXPIRY = "24h";

// ── Sign a JWT ────────────────────────────────────────────────────────────────
export async function signToken(payload: { userId: string; email: string; role?: string | null }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

// ── Verify a JWT ──────────────────────────────────────────────────────────────
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; email: string; role?: string };
  } catch {
    return null;
  }
}

// ── Extract & verify token from request cookies ───────────────────────────────
export async function getAuthFromRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── Helper: is request authenticated? ────────────────────────────────────────
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const auth = await getAuthFromRequest(request);
  return auth !== null;
}

export { COOKIE_NAME };

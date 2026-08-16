import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";

// Routes yang WAJIB login untuk akses
const PROTECTED_API_ROUTES = [
  "/api/kepala-keluarga",
  "/api/anggota-keluarga",
  "/api/users",
  "/api/upload",
  "/api/pimpinan-organisasi-desa",
  "/api/tahun-anggaran-apbd",
  "/api/report-data",
];

// Method yang boleh tanpa auth (read-only publik)
const PUBLIC_READ_ROUTES = [
  "/api/kegiatan-desa",
  "/api/agenda",
  "/api/photos",
  "/api/hukum",
  "/api/books",
];

// Halaman admin yang wajib login
const PROTECTED_PAGE_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // ── Protect admin pages ─────────────────────────────────────────────────────
  if (PROTECTED_PAGE_ROUTES.some((route) => pathname.startsWith(route))) {
    const auth = await getAuthFromRequest(request);
    if (!auth) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── Protect sensitive API routes (ALL methods) ──────────────────────────────
  if (PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route))) {
    const auth = await getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ── Public read routes: GET allowed, mutating methods require auth ──────────
  if (PUBLIC_READ_ROUTES.some((route) => pathname.startsWith(route))) {
    if (method !== "GET") {
      // POST, PUT, PATCH, DELETE require auth
      const auth = await getAuthFromRequest(request);
      if (!auth) {
        return NextResponse.json(
          { error: "Unauthorized. Silakan login untuk melakukan perubahan data." },
          { status: 401 }
        );
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/kepala-keluarga/:path*",
    "/api/anggota-keluarga/:path*",
    "/api/users/:path*",
    "/api/upload/:path*",
    "/api/pimpinan-organisasi-desa/:path*",
    "/api/tahun-anggaran-apbd/:path*",
    "/api/report-data/:path*",
    "/api/kegiatan-desa/:path*",
    "/api/agenda/:path*",
    "/api/photos/:path*",
    "/api/hukum/:path*",
    "/api/books/:path*",
  ],
};

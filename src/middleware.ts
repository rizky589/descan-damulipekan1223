import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";

// Routes yang WAJIB login untuk akses (Semua method, termasuk GET)
const PROTECTED_API_ROUTES = [
  "/api/anggota-keluarga",
  "/api/users",
  "/api/upload",
];

// Method yang boleh tanpa auth (hanya GET yang publik, POST/PUT/DELETE wajib login)
const PUBLIC_READ_ROUTES = [
  "/api/kegiatan-desa",
  "/api/agenda",
  "/api/photos",
  "/api/hukum",
  "/api/books",
  "/api/pimpinan-organisasi-desa",
  "/api/tahun-anggaran-apbd",
  "/api/report-data",
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

  // ── Custom Rule for Kepala Keluarga ──────────────────────────────────────────
  if (pathname.startsWith("/api/kepala-keluarga")) {
    // Allow public GET ONLY if it's requesting the count ?count=true
    if (method === "GET" && request.nextUrl.searchParams.get("count") === "true") {
      return NextResponse.next();
    }
    
    // Otherwise (full data or POST/PUT/DELETE), require auth
    const auth = await getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized. Akses data spesifik warga dilindungi." },
        { status: 401 }
      );
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

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const kegiatanDesas = await db.kegiatanDesa.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(kegiatanDesas);
  } catch (error) {
    console.error("Error fetching kegiatan desa:", error);
    return NextResponse.json(
      { error: "Failed to fetch kegiatan desa" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      judulKegiatan,
      tanggalKegiatan,
      waktuMulai,
      waktuSelesai,
      tempatKegiatan,
      penyelenggara,
      foto,
      narasi,
    } = body;

    if (!judulKegiatan || !tanggalKegiatan || !waktuMulai || !waktuSelesai || !tempatKegiatan || !penyelenggara) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const kegiatanDesa = await db.kegiatanDesa.create({
      data: {
        judulKegiatan,
        tanggalKegiatan: new Date(tanggalKegiatan),
        waktuMulai,
        waktuSelesai,
        tempatKegiatan,
        penyelenggara,
        foto: foto || null,
        narasi: narasi || null,
      },
    });

    return NextResponse.json(kegiatanDesa, { status: 201 });
  } catch (error) {
    console.error("Error creating kegiatan desa:", error);
    return NextResponse.json(
      { error: "Failed to create kegiatan desa" },
      { status: 500 }
    );
  }
}

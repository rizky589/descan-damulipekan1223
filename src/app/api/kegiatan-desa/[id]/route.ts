import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const kegiatanDesa = await db.kegiatanDesa.findUnique({
      where: { id },
    });

    if (!kegiatanDesa) {
      return NextResponse.json(
        { error: "Kegiatan desa not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(kegiatanDesa);
  } catch (error) {
    console.error("Error fetching kegiatan desa:", error);
    return NextResponse.json(
      { error: "Failed to fetch kegiatan desa" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
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

    const updatedKegiatanDesa = await db.kegiatanDesa.update({
      where: { id },
      data: {
        judulKegiatan,
        tanggalKegiatan: new Date(tanggalKegiatan),
        waktuMulai,
        waktuSelesai,
        tempatKegiatan,
        penyelenggara,
        foto: foto ?? undefined,
        narasi: narasi ?? undefined,
      },
    });

    return NextResponse.json(updatedKegiatanDesa);
  } catch (error) {
    console.error("Error updating kegiatan desa:", error);
    return NextResponse.json(
      { error: "Failed to update kegiatan desa" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.kegiatanDesa.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Kegiatan desa deleted successfully" });
  } catch (error) {
    console.error("Error deleting kegiatan desa:", error);
    return NextResponse.json(
      { error: "Failed to delete kegiatan desa" },
      { status: 500 }
    );
  }
}

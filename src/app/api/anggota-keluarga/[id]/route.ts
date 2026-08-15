import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const anggota = await db.anggotaKeluarga.findUnique({
      where: { id },
      include: { kepalaKeluarga: true }
    });

    if (!anggota) {
      return NextResponse.json(
        { error: "Anggota keluarga not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(anggota);
  } catch (error) {
    console.error("Error fetching anggota keluarga:", error);
    return NextResponse.json(
      { error: "Failed to fetch anggota keluarga" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { 
      nama, 
      jenisKelamin, 
      tempatLahir, 
      tanggalLahir, 
      umur, 
      nik, 
      pekerjaan, 
      pendidikan, 
      hubungan 
    } = body;

    if (!nama || !jenisKelamin || !hubungan) {
      return NextResponse.json(
        { error: "Nama, jenis kelamin, dan hubungan wajib diisi" },
        { status: 400 }
      );
    }

    const updatedAnggota = await db.anggotaKeluarga.update({
      where: { id },
      data: {
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        umur: umur ? parseInt(umur) : null,
        nik,
        pekerjaan,
        pendidikan,
        hubungan,
      },
    });

    return NextResponse.json(updatedAnggota);
  } catch (error) {
    console.error("Error updating anggota keluarga:", error);
    return NextResponse.json(
      { error: "Failed to update anggota keluarga" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.anggotaKeluarga.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Anggota keluarga deleted successfully" });
  } catch (error) {
    console.error("Error deleting anggota keluarga:", error);
    return NextResponse.json(
      { error: "Failed to delete anggota keluarga" },
      { status: 500 }
    );
  }
}

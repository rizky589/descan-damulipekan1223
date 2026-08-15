import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const kepalaKeluarga = await db.kepalaKeluarga.findUnique({
      where: { id },
      include: {
        anggota: true
      }
    });

    if (!kepalaKeluarga) {
      return NextResponse.json(
        { error: "Kepala keluarga not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(kepalaKeluarga);
  } catch (error) {
    console.error("Error fetching kepala keluarga:", error);
    return NextResponse.json(
      { error: "Failed to fetch kepala keluarga" },
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
      noKK, 
      pekerjaan, 
      pendidikan, 
      alamat 
    } = body;

    if (!nama || !jenisKelamin || !nik || !noKK || !alamat) {
      return NextResponse.json(
        { error: "Nama, jenis kelamin, NIK, No KK, dan alamat wajib diisi" },
        { status: 400 }
      );
    }

    const updatedKepalaKeluarga = await db.kepalaKeluarga.update({
      where: { id },
      data: {
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        umur: umur ? parseInt(umur) : null,
        nik,
        noKK,
        pekerjaan,
        pendidikan,
        alamat,
      },
    });

    return NextResponse.json(updatedKepalaKeluarga);
  } catch (error) {
    console.error("Error updating kepala keluarga:", error);
    return NextResponse.json(
      { error: "Failed to update kepala keluarga" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.kepalaKeluarga.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Kepala keluarga deleted successfully" });
  } catch (error) {
    console.error("Error deleting kepala keluarga:", error);
    return NextResponse.json(
      { error: "Failed to delete kepala keluarga" },
      { status: 500 }
    );
  }
}

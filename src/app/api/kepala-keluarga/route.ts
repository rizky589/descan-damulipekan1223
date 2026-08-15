import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const kepalaKeluarga = await db.kepalaKeluarga.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        anggota: true
      }
    });
    
    return NextResponse.json(kepalaKeluarga);
  } catch (error) {
    console.error("Error fetching kepala keluarga:", error);
    return NextResponse.json(
      { error: "Failed to fetch kepala keluarga" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const kepalaKeluarga = await db.kepalaKeluarga.create({
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

    return NextResponse.json(kepalaKeluarga, { status: 201 });
  } catch (error) {
    console.error("Error creating kepala keluarga:", error);
    return NextResponse.json(
      { error: "Failed to create kepala keluarga" },
      { status: 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kepalaKeluargaId = searchParams.get('kepalaKeluargaId');
    
    if (kepalaKeluargaId) {
      const anggota = await db.anggotaKeluarga.findMany({
        where: { kepalaKeluargaId },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(anggota);
    }
    
    const anggota = await db.anggotaKeluarga.findMany({
      orderBy: { createdAt: 'desc' },
      include: { kepalaKeluarga: true }
    });
    
    return NextResponse.json(anggota);
  } catch (error) {
    console.error("Error fetching anggota keluarga:", error);
    return NextResponse.json(
      { error: "Failed to fetch anggota keluarga" },
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
      pekerjaan, 
      pendidikan, 
      hubungan,
      kepalaKeluargaId
    } = body;

    if (!nama || !jenisKelamin || !hubungan || !kepalaKeluargaId) {
      return NextResponse.json(
        { error: "Nama, jenis kelamin, hubungan, dan kepala keluarga wajib diisi" },
        { status: 400 }
      );
    }

    const anggota = await db.anggotaKeluarga.create({
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
        kepalaKeluargaId,
      },
    });

    return NextResponse.json(anggota, { status: 201 });
  } catch (error) {
    console.error("Error creating anggota keluarga:", error);
    return NextResponse.json(
      { error: "Failed to create anggota keluarga" },
      { status: 500 }
    );
  }
}

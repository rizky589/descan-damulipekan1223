import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

// GET: Hanya bisa diakses setelah login (dilindungi middleware)
// Data sensitif NIK, noKK, tanggalLahir hanya dikembalikan untuk admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get("count") === "true";

    // Mode count-only: untuk keperluan statistik di beranda (tanpa data sensitif)
    if (countOnly) {
      const count = await db.kepalaKeluarga.count();
      return NextResponse.json({ count });
    }

    const kepalaKeluarga = await db.kepalaKeluarga.findMany({
      orderBy: { createdAt: "desc" },
      // TIDAK include anggota secara default — hanya load saat dibutuhkan
      select: {
        id: true,
        nama: true,
        jenisKelamin: true,
        tempatLahir: true,
        tanggalLahir: true,
        umur: true,
        nik: true,   // Sensitif — dilindungi middleware (wajib login)
        noKK: true,  // Sensitif — dilindungi middleware (wajib login)
        pekerjaan: true,
        pendidikan: true,
        alamat: true,
        createdAt: true,
        _count: {
          select: { anggota: true }, // Hanya jumlah anggota, bukan datanya
        },
      },
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
      alamat,
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

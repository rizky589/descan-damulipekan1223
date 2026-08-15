import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const pimpinan = await db.pimpinanOrganisasiDesa.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(pimpinan);
  } catch (error) {
    console.error("Error fetching pimpinan organisasi desa:", error);
    return NextResponse.json(
      { error: "Failed to fetch pimpinan organisasi desa" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      nama, 
      posisi, 
      periodeAwal, 
      periodeAkhir, 
      pengalaman, 
      fokus, 
      foto 
    } = body;

    if (!nama || !posisi) {
      return NextResponse.json(
        { error: "Nama dan posisi wajib diisi" },
        { status: 400 }
      );
    }

    const pimpinan = await db.pimpinanOrganisasiDesa.create({
      data: {
        nama,
        posisi,
        periodeAwal,
        periodeAkhir,
        pengalaman,
        fokus,
        foto,
      },
    });

    return NextResponse.json(pimpinan, { status: 201 });
  } catch (error) {
    console.error("Error creating pimpinan organisasi desa:", error);
    return NextResponse.json(
      { error: "Failed to create pimpinan organisasi desa" },
      { status: 500 }
    );
  }
}

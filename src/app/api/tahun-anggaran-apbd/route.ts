import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const apbd = await db.tahunAnggaranAPBD.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(apbd);
  } catch (error) {
    console.error("Error fetching tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to fetch tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tahun, namaPetugasKeuangan } = body;

    if (!tahun) {
      return NextResponse.json(
        { error: "Tahun wajib diisi" },
        { status: 400 }
      );
    }

    const apbd = await db.tahunAnggaranAPBD.create({
      data: {
        tahun,
        namaPetugasKeuangan,
      },
    });

    return NextResponse.json(apbd, { status: 201 });
  } catch (error) {
    console.error("Error creating tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to create tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

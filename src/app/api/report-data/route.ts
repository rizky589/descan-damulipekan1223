import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const reports = await db.reportData.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching report data:", error);
    return NextResponse.json(
      { error: "Failed to fetch report data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      judul, 
      waktuTerbit, 
      deskripsi, 
      kategori, 
      filePath 
    } = body;

    if (!judul) {
      return NextResponse.json(
        { error: "Judul wajib diisi" },
        { status: 400 }
      );
    }

    const report = await db.reportData.create({
      data: {
        judul,
        waktuTerbit: waktuTerbit ? new Date(waktuTerbit) : null,
        deskripsi,
        kategori,
        filePath,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report data:", error);
    return NextResponse.json(
      { error: "Failed to create report data" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    let limit = parseInt(searchParams.get("limit") || "10");
    if (searchParams.get("all") === "true") limit = 999999;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      db.agenda.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.agenda.count()
    ]);

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error("Error fetching agendas:", error);
    return NextResponse.json(
      { error: "Failed to fetch agendas" },
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
      penyelenggara 
    } = body;

    if (!judulKegiatan || !tanggalKegiatan || !waktuMulai || !waktuSelesai || !tempatKegiatan || !penyelenggara) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const agenda = await db.agenda.create({
      data: {
        judulKegiatan,
        tanggalKegiatan: new Date(tanggalKegiatan),
        waktuMulai,
        waktuSelesai,
        tempatKegiatan,
        penyelenggara,
      },
    });

    return NextResponse.json(agenda, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json(
      { error: "Failed to create agenda" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const agendas = await db.agenda.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(agendas);
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

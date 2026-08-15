import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const agenda = await db.agenda.findUnique({
      where: { id },
    });

    if (!agenda) {
      return NextResponse.json(
        { error: "Agenda not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json(
      { error: "Failed to fetch agenda" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      judulKegiatan,
      tanggalKegiatan,
      waktuMulai,
      waktuSelesai,
      tempatKegiatan,
      penyelenggara
    } = body;

    // Optional: validate fields if needed
    if (!judulKegiatan || !tanggalKegiatan || !waktuMulai || !waktuSelesai || !tempatKegiatan || !penyelenggara) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedAgenda = await db.agenda.update({
      where: { id },
      data: {
        judulKegiatan,
        tanggalKegiatan: new Date(tanggalKegiatan),
        waktuMulai,
        waktuSelesai,
        tempatKegiatan,
        penyelenggara,
      },
    });

    return NextResponse.json(updatedAgenda);
  } catch (error) {
    console.error("Error updating agenda:", error);
    return NextResponse.json(
      { error: "Failed to update agenda" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.agenda.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Agenda deleted successfully" });
  } catch (error) {
    console.error("Error deleting agenda:", error);
    return NextResponse.json(
      { error: "Failed to delete agenda" },
      { status: 500 }
    );
  }
}

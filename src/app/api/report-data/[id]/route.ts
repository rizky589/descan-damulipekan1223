import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const report = await db.reportData.findUnique({
      where: { id }
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report data:", error);
    return NextResponse.json(
      { error: "Failed to fetch report data" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
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

    const updatedReport = await db.reportData.update({
      where: { id },
      data: {
        judul,
        waktuTerbit: waktuTerbit ? new Date(waktuTerbit) : null,
        deskripsi,
        kategori,
        filePath,
      },
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error("Error updating report data:", error);
    return NextResponse.json(
      { error: "Failed to update report data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.reportData.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Report data deleted successfully" });
  } catch (error) {
    console.error("Error deleting report data:", error);
    return NextResponse.json(
      { error: "Failed to delete report data" },
      { status: 500 }
    );
  }
}

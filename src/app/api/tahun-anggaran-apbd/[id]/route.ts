import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const apbd = await db.tahunAnggaranAPBD.findUnique({
      where: { id }
    });

    if (!apbd) {
      return NextResponse.json(
        { error: "Tahun anggaran APBD not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(apbd);
  } catch (error) {
    console.error("Error fetching tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to fetch tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tahun, namaPetugasKeuangan } = body;

    if (!tahun) {
      return NextResponse.json(
        { error: "Tahun wajib diisi" },
        { status: 400 }
      );
    }

    const updatedApbd = await db.tahunAnggaranAPBD.update({
      where: { id },
      data: {
        tahun,
        namaPetugasKeuangan,
      },
    });

    return NextResponse.json(updatedApbd);
  } catch (error) {
    console.error("Error updating tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to update tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.tahunAnggaranAPBD.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Tahun anggaran APBD deleted successfully" });
  } catch (error) {
    console.error("Error deleting tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to delete tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

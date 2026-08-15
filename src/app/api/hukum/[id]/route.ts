import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const hukum = await db.hukum.findUnique({
      where: { id },
    });

    if (!hukum) {
      return NextResponse.json(
        { error: "Hukum not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hukum);
  } catch (error) {
    console.error("Error fetching hukum:", error);
    return NextResponse.json(
      { error: "Failed to fetch hukum" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { namaKategori, deskripsi } = body;

    if (!namaKategori) {
      return NextResponse.json(
        { error: "Nama kategori is required" },
        { status: 400 }
      );
    }

    const updatedHukum = await db.hukum.update({
      where: { id },
      data: {
        namaKategori,
        deskripsi,
      },
    });

    return NextResponse.json(updatedHukum);
  } catch (error) {
    console.error("Error updating hukum:", error);
    return NextResponse.json(
      { error: "Failed to update hukum" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.hukum.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hukum deleted successfully" });
  } catch (error) {
    console.error("Error deleting hukum:", error);
    return NextResponse.json(
      { error: "Failed to delete hukum" },
      { status: 500 }
    );
  }
}

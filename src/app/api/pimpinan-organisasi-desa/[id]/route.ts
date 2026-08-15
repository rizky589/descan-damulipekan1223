import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const pimpinan = await db.pimpinanOrganisasiDesa.findUnique({
      where: { id }
    });

    if (!pimpinan) {
      return NextResponse.json(
        { error: "Pimpinan organisasi desa not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pimpinan);
  } catch (error) {
    console.error("Error fetching pimpinan organisasi desa:", error);
    return NextResponse.json(
      { error: "Failed to fetch pimpinan organisasi desa" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
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

    const updatedPimpinan = await db.pimpinanOrganisasiDesa.update({
      where: { id },
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

    return NextResponse.json(updatedPimpinan);
  } catch (error) {
    console.error("Error updating pimpinan organisasi desa:", error);
    return NextResponse.json(
      { error: "Failed to update pimpinan organisasi desa" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    await db.pimpinanOrganisasiDesa.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Pimpinan organisasi desa deleted successfully" });
  } catch (error) {
    console.error("Error deleting pimpinan organisasi desa:", error);
    return NextResponse.json(
      { error: "Failed to delete pimpinan organisasi desa" },
      { status: 500 }
    );
  }
}

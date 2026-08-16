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
      db.hukum.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.hukum.count()
    ]);

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error("Error fetching hukums:", error);
    return NextResponse.json(
      { error: "Failed to fetch hukums" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { namaKategori, deskripsi } = body;

    if (!namaKategori) {
      return NextResponse.json(
        { error: "Nama kategori is required" },
        { status: 400 }
      );
    }

    const hukum = await db.hukum.create({
      data: {
        namaKategori,
        deskripsi,
      },
    });

    return NextResponse.json(hukum, { status: 201 });
  } catch (error) {
    console.error("Error creating hukum:", error);
    return NextResponse.json(
      { error: "Failed to create hukum" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const apbdList = await db.tahunAnggaranAPBD.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = ['Tahun', 'Nama Petugas Keuangan', 'Dibuat'];
    const rows = apbdList.map(apbd => [
      apbd.tahun,
      apbd.namaPetugasKeuangan || '',
      new Date(apbd.createdAt).toLocaleDateString('id-ID')
    ]);

    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="tahun-anggaran-apbd.csv"'
      }
    });
  } catch (error) {
    console.error("Error exporting tahun anggaran APBD:", error);
    return NextResponse.json(
      { error: "Failed to export tahun anggaran APBD" },
      { status: 500 }
    );
  }
}

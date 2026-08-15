import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const agendas = await db.agenda.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = ['Judul Kegiatan', 'Tanggal Kegiatan', 'Waktu Mulai', 'Waktu Selesai', 'Tempat Kegiatan', 'Penyelenggara', 'Dibuat'];
    const rows = agendas.map(agenda => [
      agenda.judulKegiatan,
      new Date(agenda.tanggalKegiatan).toLocaleDateString('id-ID'),
      agenda.waktuMulai,
      agenda.waktuSelesai,
      agenda.tempatKegiatan,
      agenda.penyelenggara,
      new Date(agenda.createdAt).toLocaleDateString('id-ID')
    ]);

    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="agenda.csv"'
      }
    });
  } catch (error) {
    console.error("Error exporting agenda:", error);
    return NextResponse.json(
      { error: "Failed to export agenda" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const reports = await db.reportData.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = ['Judul', 'Waktu Terbit', 'Kategori', 'Deskripsi', 'File Path', 'Dibuat'];
    const rows = reports.map(report => [
      report.judul,
      report.waktuTerbit ? new Date(report.waktuTerbit).toLocaleDateString('id-ID') : '',
      report.kategori || '',
      report.deskripsi || '',
      report.filePath || '',
      new Date(report.createdAt).toLocaleDateString('id-ID')
    ]);

    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="report-data.csv"'
      }
    });
  } catch (error) {
    console.error("Error exporting report data:", error);
    return NextResponse.json(
      { error: "Failed to export report data" },
      { status: 500 }
    );
  }
}

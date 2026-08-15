import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const books = await db.book.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = ['Judul', 'Penulis', 'Deskripsi', 'Dibuat'];
    const rows = books.map(book => [
      book.title,
      book.author,
      book.description || '',
      new Date(book.createdAt).toLocaleDateString('id-ID')
    ]);

    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="books.csv"'
      }
    });
  } catch (error) {
    console.error("Error exporting books:", error);
    return NextResponse.json(
      { error: "Failed to export books" },
      { status: 500 }
    );
  }
}

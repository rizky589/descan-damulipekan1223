import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert to CSV format
    const headers = ['name', 'email', 'role'];
    const csvRows = [headers.join(',')];
    
    for (const user of users) {
      const row = [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.role || ''}"`
      ];
      csvRows.push(row.join(','));
    }

    const csv = csvRows.join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users.csv"'
      }
    });
  } catch (error) {
    console.error("Error exporting users:", error);
    return NextResponse.json(
      { error: "Failed to export users" },
      { status: 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    // Skip header row
    const dataLines = lines.slice(1);
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const line of dataLines) {
      try {
        // Parse CSV line (handle quoted values)
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (!matches || matches.length < 2) {
          results.failed++;
          results.errors.push(`Invalid line format: ${line}`);
          continue;
        }

        const name = matches[0]?.replace(/^"|"$/g, '') || '';
        const email = matches[1]?.replace(/^"|"$/g, '') || '';
        const role = matches[2]?.replace(/^"|"$/g, '') || null;

        if (!name || !email) {
          results.failed++;
          results.errors.push(`Missing required fields: ${line}`);
          continue;
        }

        await db.user.create({
          data: {
            name,
            email,
            role,
          },
        });
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Error processing line: ${line}`);
      }
    }

    return NextResponse.json({
      message: `Import selesai. Berhasil: ${results.success}, Gagal: ${results.failed}`,
      details: results
    });
  } catch (error) {
    console.error("Error importing users:", error);
    return NextResponse.json(
      { error: "Failed to import users" },
      { status: 500 }
    );
  }
}

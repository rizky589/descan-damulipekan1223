import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    console.log("Fetching books");
    const books = await db.book.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log("Books:", books);
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating book");
    const body = await request.json();
    console.log("Body:", body);
    const { 
      title, 
      author, 
      description 
    } = body;

    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    const book = await db.book.create({
      data: {
        title,
        author,
        description,
      },
    });
    console.log("Created book:", book);
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getTutorials, createTutorial } from "@/lib/db";

export async function GET() {
  try {
    const tutorials = await getTutorials();
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutorials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.slug ||
      !body.title ||
      !body.content ||
      !body.level ||
      !body.category
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tutorial = await createTutorial({
      slug: body.slug,
      title: body.title,
      description: body.description || "",
      level: body.level,
      duration: body.duration || "",
      content: body.content,
      category: body.category,
      order: body.order || 0,
      is_free: body.is_free !== undefined ? body.is_free : true,
    });

    return NextResponse.json(tutorial, { status: 201 });
  } catch (error) {
    console.error("Error creating tutorial:", error);
    return NextResponse.json(
      { error: "Failed to create tutorial" },
      { status: 500 }
    );
  }
}

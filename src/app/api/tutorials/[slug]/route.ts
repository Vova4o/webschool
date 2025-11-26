import { NextRequest, NextResponse } from "next/server";
import { getTutorialBySlug } from "@/lib/db";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const tutorial = await getTutorialBySlug(slug);

    if (!tutorial) {
      return NextResponse.json(
        { error: "Tutorial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutorial" },
      { status: 500 }
    );
  }
}

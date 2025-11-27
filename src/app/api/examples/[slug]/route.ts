import { NextResponse } from "next/server";
import { getExampleBySlug } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const example = await getExampleBySlug(slug);

    if (!example) {
      return NextResponse.json({ error: "Example not found" }, { status: 404 });
    }

    return NextResponse.json(example);
  } catch (error) {
    console.error("Error fetching example:", error);
    return NextResponse.json(
      { error: "Failed to fetch example" },
      { status: 500 }
    );
  }
}

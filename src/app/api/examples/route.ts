import { NextRequest, NextResponse } from "next/server";
import { getExamples, createExample } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const examples = await getExamples();
    return NextResponse.json(examples);
  } catch (error) {
    console.error("Error fetching examples:", error);
    return NextResponse.json(
      { error: "Failed to fetch examples" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const body = await request.json();
    const example = await createExample(body);
    return NextResponse.json(example);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating example:", error);
    return NextResponse.json(
      { error: "Failed to create example" },
      { status: 500 }
    );
  }
}

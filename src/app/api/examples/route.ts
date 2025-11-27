import { NextResponse } from "next/server";
import { getExamples, createExample } from "@/lib/db";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const example = await createExample(body);
    return NextResponse.json(example);
  } catch (error) {
    console.error("Error creating example:", error);
    return NextResponse.json(
      { error: "Failed to create example" },
      { status: 500 }
    );
  }
}

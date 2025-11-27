import { NextResponse } from "next/server";
import { updateExample, deleteExample } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const example = await updateExample(parseInt(id), body);
    return NextResponse.json(example);
  } catch (error) {
    console.error("Error updating example:", error);
    return NextResponse.json(
      { error: "Failed to update example" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteExample(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting example:", error);
    return NextResponse.json(
      { error: "Failed to delete example" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { updateExample, deleteExample } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request);

    const { id } = await params;
    const body = await request.json();
    const example = await updateExample(parseInt(id), body);
    return NextResponse.json(example);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating example:", error);
    return NextResponse.json(
      { error: "Failed to update example" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request);

    const { id } = await params;
    await deleteExample(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting example:", error);
    return NextResponse.json(
      { error: "Failed to delete example" },
      { status: 500 }
    );
  }
}

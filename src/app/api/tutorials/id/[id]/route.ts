import { NextRequest, NextResponse } from "next/server";
import { updateTutorial, deleteTutorial } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await requireAdmin(request);

    const { id } = await params;
    const tutorialId = parseInt(id, 10);

    if (isNaN(tutorialId)) {
      return NextResponse.json(
        { error: "Invalid tutorial ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const tutorial = await updateTutorial(tutorialId, body);

    return NextResponse.json(tutorial);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating tutorial:", error);
    return NextResponse.json(
      { error: "Failed to update tutorial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await requireAdmin(request);

    const { id } = await params;
    const tutorialId = parseInt(id, 10);

    if (isNaN(tutorialId)) {
      return NextResponse.json(
        { error: "Invalid tutorial ID" },
        { status: 400 }
      );
    }

    await deleteTutorial(tutorialId);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting tutorial:", error);
    return NextResponse.json(
      { error: "Failed to delete tutorial" },
      { status: 500 }
    );
  }
}

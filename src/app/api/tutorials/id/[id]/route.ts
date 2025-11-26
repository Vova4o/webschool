import { NextRequest, NextResponse } from "next/server";
import { updateTutorial, deleteTutorial } from "@/lib/db";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
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
    console.error("Error updating tutorial:", error);
    return NextResponse.json(
      { error: "Failed to update tutorial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
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
    console.error("Error deleting tutorial:", error);
    return NextResponse.json(
      { error: "Failed to delete tutorial" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

export async function POST() {
  try {
    await seedDatabase();
    return NextResponse.json({
      message:
        "База данных успешно инициализирована! Таблицы созданы и начальные уроки добавлены.",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    return NextResponse.json(
      {
        error: "Не удалось инициализировать базу данных",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

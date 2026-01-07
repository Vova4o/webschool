import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Примеры кода Go - Go Изучаем! Повторяем!",
  description:
    "Практические примеры кода на Go с объяснениями. От простых программ Hello World до продвинутых паттернов параллелизма.",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
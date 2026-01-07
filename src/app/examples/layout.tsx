import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Примеры кода Go - Go Изучаем! Повторяем!",
  description:
    "Практические примеры кода на Go с объяснениями. Изучите переменные, срезы, структуры, горутины, каналы и обработку ошибок.",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

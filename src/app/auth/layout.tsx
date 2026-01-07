import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Go Изучаем! Повторяем!",
    default: "Авторизация - Go Изучаем! Повторяем!",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

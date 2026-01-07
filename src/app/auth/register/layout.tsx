import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте аккаунт для доступа к урокам и материалам по программированию на Go.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
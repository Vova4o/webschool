import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description:
    "Войдите в свой аккаунт для доступа к урокам программирования на Go.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    isPremium: boolean;
    premiumUntil: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "admin";
    isPremium: boolean;
    premiumUntil: string | null;
  }
}

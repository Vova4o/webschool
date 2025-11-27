import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Require admin role for the request
 * Throws error if not authenticated or not admin
 */
export async function requireAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return token;
}

/**
 * Get authenticated user from request
 * Returns null if not authenticated
 */
export async function getAuthUser(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token;
}

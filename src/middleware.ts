import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Allow NextAuth routes to pass through
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect /admin routes and /api/admin routes with Basic Auth
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/api/admin")
  ) {
    const basicAuth = request.headers.get("authorization");

    if (!basicAuth) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    // Check against environment variables
    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

    if (user !== ADMIN_USER || password !== ADMIN_PASSWORD) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"],
};

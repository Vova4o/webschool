import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, getUserCount } from "@/lib/db";
import { ensureDatabaseReady } from "@/lib/migrations";

export async function POST(request: NextRequest) {
  try {
    // Ensure database tables exist before registration
    await ensureDatabaseReady();

    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if this is the first user - make them admin
    const userCount = await getUserCount();
    const isFirstUser = userCount === 0;

    // Create user
    const user = await createUser({
      email,
      password_hash: passwordHash,
      name,
      role: isFirstUser ? "admin" : "user",
      is_premium: isFirstUser ? true : false, // First user gets premium
      premium_until: null,
    });

    return NextResponse.json(
      {
        message: isFirstUser
          ? "Congratulations! You're the first user and have been granted admin access. Login and go to /admin to initialize the database with content."
          : "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        isAdmin: isFirstUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

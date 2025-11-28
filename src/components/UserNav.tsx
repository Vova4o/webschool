"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
    );
  }

  if (session?.user) {
    const isAdmin = (session.user as any).role === "admin";

    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {session.user.name}
          </span>
          {session.user.isPremium && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
              Premium
            </span>
          )}
        </div>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-sm px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
          >
            Admin
          </Link>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/login"
        className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        Sign in
      </Link>
      <Link
        href="/auth/register"
        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  );
}

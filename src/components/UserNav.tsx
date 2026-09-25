"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function GuestActions() {
  return (
    <div className="user-actions">
      <Link href="/auth/login" className="user-action user-action-quiet">
        Войти
      </Link>
      <Link href="/auth/register" className="user-action user-action-primary">
        Регистрация
      </Link>
    </div>
  );
}

export default function UserNav() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return <GuestActions />;
  }

  if (!session?.user) {
    return <GuestActions />;
  }

  const isAdmin = (session.user as { role?: string }).role === "admin";

  return (
    <div className="user-actions">
      <div className="user-profile">
        <span className="user-name">{session.user.name}</span>
        {session.user.isPremium && <span className="user-premium">Премиум</span>}
      </div>
      {isAdmin && (
        <Link href="/admin" className="user-action user-action-admin">
          Админ
        </Link>
      )}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="user-action user-action-quiet"
      >
        Выйти
      </button>
    </div>
  );
}

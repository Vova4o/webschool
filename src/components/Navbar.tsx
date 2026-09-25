"use client";

import Link from "next/link";
import { useState } from "react";
import UserNav from "./UserNav";

const links = [
  { href: "/", label: "Главная" },
  { href: "/tutorials", label: "Уроки" },
  { href: "/examples", label: "Примеры" },
  { href: "/reference", label: "Справочник" },
  { href: "/pricing", label: "Тарифы" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="nav-bar">
          <Link href="/" className="brand" aria-label="Go — главная">
            <span className="brand-mark" aria-hidden="true"><span>go</span><i /></span>
            <span className="brand-copy"><strong>Go</strong><span>изучаем · повторяем</span></span>
          </Link>

          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>
          <div className="desktop-user-nav"><UserNav /></div>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className={isOpen ? "menu-icon is-open" : "menu-icon"} aria-hidden="true"><i /><i /></span>
          </button>
        </div>

        <div id="mobile-navigation" className={`mobile-navigation${isOpen ? " is-open" : ""}`} hidden={!isOpen}>
          <nav aria-label="Мобильная навигация">
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setIsOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>
            ))}
          </nav>
          <div className="mobile-user-nav"><UserNav /></div>
        </div>
      </div>
    </header>
  );
}

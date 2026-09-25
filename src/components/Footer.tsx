import Link from "next/link";

const sections = [
  { href: "/tutorials", label: "Уроки" },
  { href: "/examples", label: "Примеры кода" },
  { href: "/reference", label: "Справочник" },
  { href: "/pricing", label: "Тарифы" },
];

const resources = [
  { href: "https://go.dev/", label: "Официальный сайт Go" },
  { href: "https://pkg.go.dev/", label: "Документация пакетов" },
  { href: "https://go.dev/play/", label: "Go Playground" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr] lg:py-14">
          <div className="footer-brand-column">
            <Link href="/" className="brand footer-brand" aria-label="Go — главная">
              <span className="brand-mark" aria-hidden="true"><span>go</span><i /></span>
              <span className="brand-copy"><strong>Go</strong><span>изучаем · повторяем</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Практический маршрут по Go: изучайте идею, пишите свой код, проверяйте результат.</p>
          </div>
          <div>
            <h2 className="footer-heading">На сайте</h2>
            <ul className="mt-4 space-y-3">
              {sections.map((section) => (
                <li key={section.href}><Link className="footer-link" href={section.href}>{section.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">Ресурсы Go</h2>
            <ul className="mt-4 space-y-3">
              {resources.map((resource) => (
                <li key={resource.href}><a className="footer-link" href={resource.href} target="_blank" rel="noopener noreferrer">{resource.label}<span aria-hidden="true" className="ml-2 text-xs">↗</span></a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Go · Изучаем и повторяем</p>
          <p>Учитесь через практику. Стройте с пониманием.</p>
        </div>
      </div>
    </footer>
  );
}

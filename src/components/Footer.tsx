import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                Go
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Изучаем! Повторяем!
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-200">
              Ваш комплексный ресурс для изучения языка программирования Go.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
              Разделы
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/tutorials"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Уроки
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Примеры кода
                </Link>
              </li>
              <li>
                <Link
                  href="/reference"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Справочник
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Тарифы
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
              Ссылки
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://golang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Официальный сайт Go
                </a>
              </li>
              <li>
                <a
                  href="https://pkg.go.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Пакеты Go
                </a>
              </li>
              <li>
                <a
                  href="https://play.golang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  Go Playground
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-600 dark:text-gray-300 text-center">
            © 2025 Go Изучаем! Повторяем!. Создано с помощью Next.js и Tailwind
            CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

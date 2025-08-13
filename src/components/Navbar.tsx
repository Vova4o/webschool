import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              Go
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
              Изучаем! Повторяем!
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Главная
            </Link>
            <Link
              href="/tutorials"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Уроки
            </Link>
            <Link
              href="/examples"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Примеры
            </Link>
            <Link
              href="/reference"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Справочник
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 relative">
      {/* Go Mascot in bottom right corner */}
      <div className="fixed bottom-4 right-4 opacity-30 pointer-events-none z-10">
        <Image
          src="/gopherdrink-3547479203.png"
          alt="Go Mascot с напитком"
          width={120}
          height={120}
          className="transform -rotate-12"
        />
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center relative">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl relative z-10">
            Изучайте программирование на Go
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl relative z-10">
            Освойте язык программирования Go с помощью наших комплексных уроков,
            примеров и практических упражнений. От основ до продвинутых
            концепций — мы проведём вас через всё путешествие изучения Go.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/tutorials"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Начать обучение
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/examples"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Смотреть примеры
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  Комплексные уроки
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Пошаговые руководства, охватывающие основы Go, синтаксис и
                лучшие практики.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  Примеры кода
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Реальные примеры и фрагменты кода, которые вы можете запускать и
                изменять.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  Практические упражнения
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Практические упражнения для закрепления знаний и повышения
                уверенности.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Готовы начать своё путешествие в Go?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🚀 Для начинающих
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Начните с нашего введения в программирование на Go, включая
                установку, базовый синтаксис и вашу первую программу.
              </p>
              <Link
                href="/tutorials/basics"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
              >
                Начать урок →
              </Link>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📚 Продвинутые темы
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Углубитесь в параллелизм, интерфейсы, обработку ошибок и
                продвинутые паттерны Go для опытных разработчиков.
              </p>
              <Link
                href="/tutorials/advanced"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
              >
                Изучить продвинутое →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                  Go
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Веб Школа
                </span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Ваш комплексный ресурс для изучения языка программирования Go.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                Обучающие ресурсы
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/tutorials"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Уроки
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examples"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Примеры кода
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reference"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Справочник
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                Быстрые ссылки
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="https://golang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Официальный сайт Go
                  </a>
                </li>
                <li>
                  <a
                    href="https://pkg.go.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Пакеты Go
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.golang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Go Playground
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-base text-gray-400 dark:text-gray-500 text-center">
              © 2025 Go Веб Школа. Создано с помощью Next.js и Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

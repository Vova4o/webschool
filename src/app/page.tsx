import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute -top-6 -right-10 hidden sm:block">
              <Image
                src="/gopherdrink-3547479203.png"
                alt="Go Mascot с напитком"
                width={120}
                height={120}
                className="transform -rotate-12 drop-shadow-lg"
                priority
              />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Изучайте программирование на Go
            </h1>
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-400 sm:text-base md:text-lg md:mt-5 lg:text-xl">
            Освойте язык программирования Go с помощью наших комплексных уроков,
            примеров и практических упражнений. От основ до продвинутых
            концепций — мы проведём вас через всё путешествие изучения Go.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3">
            <Link
              href="/tutorials"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors sm:py-4 md:text-lg md:px-10"
            >
              Начать обучение
            </Link>
            <Link
              href="/examples"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors sm:py-4 md:text-lg md:px-10"
            >
              Смотреть примеры
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 sm:p-6">
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
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center relative">
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

      <div className="max-w-md mx-auto px-4 text-center">
        <div className="mb-8">
          {/* Large 404 styled like Go */}
          <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            404
          </div>

          {/* Go gopher ASCII art */}
          <div className="text-4xl mb-6">🐹</div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Этот раздел скоро появится!
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Мы усердно работаем над этой частью сайта. Скоро здесь будет много
            интересного контента по Go!
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
          >
            🏠 Вернуться на главную
          </Link>

          <Link
            href="/tutorials"
            className="block w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            📚 Посмотреть уроки
          </Link>
        </div>

        {/* Fun message */}
        <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Совет:</strong> Пока мы работаем над новым контентом,
            изучите наши базовые уроки по Go!
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Прогресс разработки:
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full animate-pulse"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            65% готово
          </p>
        </div>
      </div>
    </div>
  );
}

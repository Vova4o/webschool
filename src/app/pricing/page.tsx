import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Выберите свой план
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Получите доступ к премиум-урокам и расширенным материалам
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Бесплатный
            </h2>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                $0
              </span>
              <span className="text-gray-600 dark:text-gray-400">/месяц</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Доступ к бесплатным урокам
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Базовые примеры кода
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Справочник по языку
                </span>
              </li>
            </ul>
            <Link
              href="/auth/register"
              className="block w-full text-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Начать бесплатно
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-white relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              Популярный
            </div>
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-blue-200">/месяц</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Все бесплатные функции</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Доступ ко всем премиум-урокам</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Продвинутые примеры и проекты</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Эксклюзивный контент</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Приоритетная поддержка</span>
              </li>
            </ul>
            <button
              disabled
              className="block w-full text-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-md font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Скоро доступно
            </button>
            <p className="text-xs text-blue-200 mt-3 text-center">
              Интеграция платежей в разработке
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Часто задаваемые вопросы
          </h3>
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Могу ли я отменить подписку в любое время?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Да, вы можете отменить подписку в любое время. Доступ к
                премиум-контенту сохранится до конца оплаченного периода.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Есть ли пробный период?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Да, мы предлагаем 7-дневный бесплатный пробный период для новых
                пользователей.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Какие способы оплаты принимаются?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Мы принимаем все основные кредитные карты через безопасную
                платежную систему.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

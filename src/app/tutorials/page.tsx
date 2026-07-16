import Link from "next/link";
import { getTutorials, Tutorial } from "@/lib/db";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const QUERY_TIMEOUT_MS = 1500;

export const metadata: Metadata = {
  title: "Go Tutorials | WebSchool",
  description:
    "Learn Go programming from basics to advanced topics including PostgreSQL, Redis, Kafka, Docker, and microservices.",
  openGraph: {
    title: "Go Tutorials | WebSchool",
    description:
      "Learn Go programming from basics to advanced topics including PostgreSQL, Redis, Kafka, Docker, and microservices.",
  },
};

interface FallbackTutorial {
  title: string;
  description: string;
  level: string;
  duration: string;
  slug: string;
}

const fallbackBasicTutorials: FallbackTutorial[] = [
  {
    title: "Начало работы с Go",
    description:
      "Изучите основы программирования на Go, установку и вашу первую программу.",
    level: "Начинающий",
    duration: "30 мин",
    slug: "getting-started",
  },
];

const fallbackAdvancedTutorials: FallbackTutorial[] = [
  {
    title: "Работа с PostgreSQL",
    description:
      "Изучите подключение к PostgreSQL, выполнение запросов и работу с транзакциями в Go.",
    level: "Продвинутый",
    duration: "120 мин",
    slug: "postgresql-integration",
  },
  {
    title: "Интеграция с Redis",
    description:
      "Освойте кэширование данных и работу с Redis в Go приложениях.",
    level: "Продвинутый",
    duration: "90 мин",
    slug: "redis-caching",
  },
  {
    title: "Работа с Apache Kafka",
    description:
      "Изучите отправку и получение сообщений через Apache Kafka в Go.",
    level: "Продвинутый",
    duration: "150 мин",
    slug: "kafka-messaging",
  },
  {
    title: "RabbitMQ и очереди сообщений",
    description:
      "Настройте систему обмена сообщениями с RabbitMQ в Go приложениях.",
    level: "Продвинутый",
    duration: "135 мин",
    slug: "rabbitmq-queues",
  },
  {
    title: "Docker и контейнеризация",
    description:
      "Создайте Docker-образы для Go приложений и настройте развертывание.",
    level: "Продвинутый",
    duration: "100 мин",
    slug: "docker-containerization",
  },
  {
    title: "Микросервисы с gRPC",
    description:
      "Постройте микросервисную архитектуру используя gRPC и Protocol Buffers.",
    level: "Продвинутый",
    duration: "180 мин",
    slug: "grpc-microservices",
  },
];

async function getTutorialsWithTimeout() {
  return Promise.race([
    getTutorials(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Tutorials query timeout")), QUERY_TIMEOUT_MS)
    ),
  ]);
}

export default async function Tutorials() {
  let basicTutorials: (Tutorial | FallbackTutorial)[] = [];
  let advancedTutorials: (Tutorial | FallbackTutorial)[] = [];

  try {
    const allTutorials = await getTutorialsWithTimeout();
    basicTutorials = allTutorials.filter((t) => t.category === "basics");
    advancedTutorials = allTutorials.filter((t) => t.category === "advanced");
  } catch (error) {
    console.error("Failed to fetch tutorials from database:", error);
    // Use fallback data if database is not available
    basicTutorials = fallbackBasicTutorials;
    advancedTutorials = fallbackAdvancedTutorials;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Начинающий":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Средний":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Продвинутый":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Уроки программирования на Go
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-600 dark:text-gray-400 px-2">
            Освойте программирование на Go с помощью наших пошаговых уроков, от
            основ до продвинутых практик с инструментами.
          </p>
        </div>

        {/* Базовые знания */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              📚 Базовые знания
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Изучите основы языка Go: синтаксис, типы данных, функции и
              ключевые концепции.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {basicTutorials.map((tutorial) => (
              <div
                key={tutorial.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
                        tutorial.level
                      )}`}
                    >
                      {tutorial.level}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tutorial.duration}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tutorial.description}
                  </p>
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Начать урок
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Продвинутые практики */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              🚀 Продвинутые практики с инструментами
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Изучите интеграцию Go с популярными инструментами: PostgreSQL,
              Redis, Kafka, RabbitMQ и др.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedTutorials.map((tutorial) => (
              <div
                key={tutorial.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
                        tutorial.level
                      )}`}
                    >
                      {tutorial.level}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tutorial.duration}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tutorial.description}
                  </p>
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                  >
                    Изучить
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📋 Рекомендуемый путь обучения
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Следуйте этому структурированному пути для полного освоения Go от
            основ до профессиональной разработки:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Базовые знания путь */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                🎯 Этап 1: Базовые знания
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Начало работы с Go
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Переменные и типы данных
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Управляющие конструкции
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Функции и методы
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    5
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Структуры и интерфейсы
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    6
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Параллелизм с горутинами
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Продвинутые практики путь */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                🚀 Этап 2: Продвинутые практики
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Docker и контейнеризация
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Работа с PostgreSQL
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Интеграция с Redis
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      RabbitMQ и очереди сообщений
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    5
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Работа с Apache Kafka
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    6
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Микросервисы с gRPC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 <strong>Совет:</strong> Завершите все уроки из раздела
              &ldquo;Базовые знания&rdquo; прежде чем переходить к
              &ldquo;Продвинутым практикам&rdquo;. Это обеспечит прочную основу
              для работы с внешними инструментами и технологиями.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

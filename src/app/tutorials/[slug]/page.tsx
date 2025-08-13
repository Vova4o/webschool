import Link from "next/link";
import { notFound } from "next/navigation";

// Tutorial data - in a real app, this could come from a CMS or markdown files
const tutorials = {
  "getting-started": {
    title: "Начало работы с Go",
    description:
      "Изучите основы программирования на Go, установку и вашу первую программу.",
    level: "Начинающий",
    duration: "30 мин",
    content: `
# Начало работы с Go

Добро пожаловать в мир программирования на Go! В этом уроке вы изучите основы языка Go и создадите свою первую программу.

## Что такое Go?

Go (также известный как Golang) — это язык программирования с открытым исходным кодом, разработанный в Google. Он был создан для решения проблем разработки программного обеспечения в Google: многоядерные процессоры, сетевые системы, массивные кодовые базы и веб-разработка.

## Ключевые особенности Go

- **Простота**: Чистый и минималистичный синтаксис
- **Быстрота**: Компилируется в машинный код
- **Параллелизм**: Встроенная поддержка горутин и каналов
- **Безопасность**: Сборка мусора и строгая типизация
- **Кроссплатформенность**: Работает на Windows, macOS, Linux

## Установка Go

### 1. Загрузите Go
Перейдите на [официальный сайт Go](https://golang.org/dl/) и загрузите установщик для вашей операционной системы.

### 2. Установите Go
Запустите загруженный установщик и следуйте инструкциям.

### 3. Проверьте установку
Откройте терминал и выполните:

\`\`\`bash
go version
\`\`\`

Вы должны увидеть что-то вроде: \`go version go1.21.0 darwin/amd64\`

## Ваша первая программа

Создайте файл \`hello.go\`:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Привет, мир!")
}
\`\`\`

### Объяснение кода:

- \`package main\`: Объявляет, что это исполняемая программа
- \`import "fmt"\`: Импортирует пакет для форматированного вывода
- \`func main()\`: Точка входа в программу
- \`fmt.Println()\`: Выводит текст в консоль

### Запуск программы

\`\`\`bash
go run hello.go
\`\`\`

Результат: \`Привет, мир!\`

## Структура Go программы

1. **Package declaration**: Каждый файл начинается с объявления пакета
2. **Imports**: Импорт необходимых пакетов
3. **Functions**: Функции, включая обязательную \`main()\`

## Что дальше?

Теперь вы готовы изучать:
- Переменные и типы данных
- Управляющие конструкции
- Функции и методы

Поздравляем с первым шагом в изучении Go!
    `,
  },
  "variables-and-types": {
    title: "Переменные и типы данных",
    description:
      "Изучите систему типов Go, переменные, константы и базовые типы данных.",
    level: "Начинающий",
    duration: "45 мин",
    content: `
# Переменные и типы данных в Go

В этом уроке вы изучите систему типов Go, способы объявления переменных и работу с различными типами данных.

## Объявление переменных

### Полное объявление
\`\`\`go
var name string = "Иван"
var age int = 25
\`\`\`

### С выводом типа
\`\`\`go
var name = "Иван"  // Go автоматически определит тип string
var age = 25       // Go автоматически определит тип int
\`\`\`

### Краткое объявление (только внутри функций)
\`\`\`go
name := "Иван"
age := 25
\`\`\`

## Базовые типы данных

### Числовые типы
- \`int\`, \`int8\`, \`int16\`, \`int32\`, \`int64\`
- \`uint\`, \`uint8\`, \`uint16\`, \`uint32\`, \`uint64\`
- \`float32\`, \`float64\`
- \`complex64\`, \`complex128\`

### Строки и символы
- \`string\`: Строки в UTF-8
- \`rune\`: Символ Unicode (alias для int32)
- \`byte\`: Байт (alias для uint8)

### Логический тип
- \`bool\`: true или false

## Примеры использования

\`\`\`go
package main

import "fmt"

func main() {
    // Строки
    name := "Анна"
    fmt.Printf("Имя: %s\\n", name)
    
    // Числа
    age := 30
    height := 1.75
    fmt.Printf("Возраст: %d, Рост: %.2f\\n", age, height)
    
    // Логические значения
    isStudent := true
    fmt.Printf("Студент: %t\\n", isStudent)
}
\`\`\`

## Константы

\`\`\`go
const pi = 3.14159
const greeting = "Привет"

// Группа констант
const (
    monday = 1
    tuesday = 2
    wednesday = 3
)
\`\`\`

## Нулевые значения

Go автоматически инициализирует переменные нулевыми значениями:
- \`0\` для числовых типов
- \`""\` для строк
- \`false\` для bool
- \`nil\` для указателей, срезов, карт, каналов, функций и интерфейсов

Попробуйте создать программу с различными типами переменных!
    `,
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = tutorials[slug as keyof typeof tutorials];

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Tutorial Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to tutorials */}
        <div className="mb-8">
          <Link
            href="/tutorials"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Назад к урокам
          </Link>
        </div>

        {/* Tutorial Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {tutorial.level}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tutorial.duration}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {tutorial.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            {tutorial.description}
          </p>
        </div>

        {/* Tutorial Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {tutorial.content.split("\n").map((line, index) => {
              if (line.startsWith("# ")) {
                return (
                  <h1
                    key={index}
                    className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
                  >
                    {line.slice(2)}
                  </h1>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white"
                  >
                    {line.slice(3)}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white"
                  >
                    {line.slice(4)}
                  </h3>
                );
              }
              if (line.startsWith("```")) {
                // This is a simple implementation - in a real app you'd use a proper markdown parser
                return null;
              }
              if (line.startsWith("- ")) {
                return (
                  <li
                    key={index}
                    className="mb-2 text-gray-700 dark:text-gray-300"
                  >
                    {line.slice(2)}
                  </li>
                );
              }
              if (line.trim() === "") {
                return <div key={index} className="mb-4"></div>;
              }
              if (line.startsWith("`") && line.endsWith("`")) {
                return (
                  <code
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {line.slice(1, -1)}
                  </code>
                );
              }
              return (
                <p
                  key={index}
                  className="mb-4 text-gray-700 dark:text-gray-300"
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/tutorials"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Все уроки
          </Link>

          <Link
            href="/tutorials/variables-and-types"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Следующий урок
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </main>
    </div>
  );
}

// Generate static params for known tutorials
export async function generateStaticParams() {
  return Object.keys(tutorials).map((slug) => ({
    slug,
  }));
}

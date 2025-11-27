import Link from "next/link";
import { getExamples, Example } from "@/lib/db";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Go Code Examples | WebSchool",
  description:
    "Practical Go programming examples covering basics, data structures, concurrency, and more.",
};

export default async function Examples() {
  let examples: Example[] = [];

  try {
    examples = await getExamples();
  } catch (error) {
    console.error("Failed to fetch examples:", error);
  }

  const fallbackExamples = [
    {
      title: "Привет, мир",
      description: "Простая программа Hello World для начала работы с Go.",
      category: "Основы",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Привет, мир!")
}`,
      explanation:
        "Это классическая первая программа. Она импортирует пакет fmt и использует Println для вывода текста.",
    },
    {
      title: "Переменные и константы",
      description: "Работа с различными типами переменных и констант в Go.",
      category: "Основы",
      code: `package main

import "fmt"

func main() {
    // Объявление переменных
    var name string = "Программирование на Go"
    var version float64 = 1.21
    
    // Краткое объявление переменной
    isAwesome := true
    
    // Константы
    const pi = 3.14159
    
    fmt.Printf("Язык: %s\\n", name)
    fmt.Printf("Версия: %.2f\\n", version)
    fmt.Printf("Потрясающий: %t\\n", isAwesome)
    fmt.Printf("Пи: %f\\n", pi)
}`,
      explanation:
        "Демонстрирует различные способы объявления переменных и констант, а также различные типы данных.",
    },
    {
      title: "Операции со срезами",
      description: "Работа со срезами - динамическими массивами в Go.",
      category: "Структуры данных",
      code: `package main

import "fmt"

func main() {
    // Создание срезов
    numbers := []int{1, 2, 3, 4, 5}
    
    // Добавление в срез
    numbers = append(numbers, 6, 7, 8)
    
    // Получение подсреза
    subset := numbers[2:5]
    
    fmt.Println("Исходный срез:", numbers)
    fmt.Println("Подсрез [2:5]:", subset)
    fmt.Println("Длина:", len(numbers))
    fmt.Println("Ёмкость:", cap(numbers))
    
    // Итерация по срезу
    for i, value := range numbers {
        fmt.Printf("Индекс: %d, Значение: %d\\n", i, value)
    }
}`,
      explanation:
        "Показывает, как создавать, изменять и итерировать по срезам, которые являются одним из наиболее важных типов данных в Go.",
    },
    {
      title: "Структуры и методы",
      description:
        "Определение структур и методов для создания пользовательских типов.",
      category: "ООП",
      code: `package main

import "fmt"

// Определение структуры
type Person struct {
    Name string
    Age  int
    City string
}

// Метод с приёмником по значению
func (p Person) Greet() string {
    return fmt.Sprintf("Привет, я %s из %s", p.Name, p.City)
}

// Метод с приёмником по указателю
func (p *Person) HaveBirthday() {
    p.Age++
}

func main() {
    // Создание экземпляра структуры
    person := Person{
        Name: "Алиса",
        Age:  25,
        City: "Москва",
    }
    
    fmt.Println(person.Greet())
    fmt.Printf("Возраст до дня рождения: %d\\n", person.Age)
    
    person.HaveBirthday()
    fmt.Printf("Возраст после дня рождения: %d\\n", person.Age)
}`,
      explanation:
        "Демонстрирует, как определять структуры и прикреплять к ним методы, показывая приёмники по значению и по указателю.",
    },
    {
      title: "Горутины и каналы",
      description: "Основы параллелизма с горутинами и каналами.",
      category: "Параллелизм",
      code: `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Работник %d обрабатывает задание %d\\n", id, job)
        time.Sleep(time.Second) // Имитация работы
        results <- job * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Запуск 3 работников
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Отправка 5 заданий
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Сбор результатов
    for r := 1; r <= 5; r++ {
        result := <-results
        fmt.Printf("Результат: %d\\n", result)
    }
}`,
      explanation:
        "Показывает, как использовать горутины для параллельного выполнения и каналы для коммуникации между ними.",
    },
    {
      title: "Обработка ошибок",
      description: "Правильные паттерны обработки ошибок в Go.",
      category: "Обработка ошибок",
      code: `package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("деление на ноль")
    }
    return a / b, nil
}

func main() {
    // Успешная операция
    result, err := divide(10, 2)
    if err != nil {
        fmt.Printf("Ошибка: %v\\n", err)
    } else {
        fmt.Printf("10 / 2 = %.2f\\n", result)
    }
    
    // Операция с ошибкой
    result, err = divide(10, 0)
    if err != nil {
        fmt.Printf("Ошибка: %v\\n", err)
    } else {
        fmt.Printf("10 / 0 = %.2f\\n", result)
    }
}`,
      explanation:
        "Демонстрирует подход Go к обработке ошибок с использованием множественных возвращаемых значений и явной проверки ошибок.",
    },
  ];

  // Use database examples if available, fallback to hardcoded
  const displayExamples = examples.length > 0 ? examples : fallbackExamples;
  const categories = [
    ...new Set(displayExamples.map((example) => example.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Примеры кода на Go
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Практические примеры кода для понимания концепций программирования
            на Go.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="space-y-8">
          {displayExamples.map((example, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {example.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {example.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {example.description}
                </p>

                {/* Code Block */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Go</span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(example.code)
                      }
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Скопировать код
                    </button>
                  </div>
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>

                {/* Explanation */}
                {"explanation" in example && example.explanation && (
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Объяснение
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Try it out section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Готовы попробовать эти примеры?
          </h3>
          <p className="text-blue-100 mb-6">
            Скопируйте примеры кода и запустите их в Go Playground или в вашей
            локальной среде.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.golang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Go Playground
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <Link
              href="/tutorials"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Узнать больше в уроках
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

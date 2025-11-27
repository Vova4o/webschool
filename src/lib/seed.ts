import { createTutorialsTable, createTutorial, createExample } from "@/lib/db";

const tutorialsData = [
  {
    slug: "getting-started",
    title: "Начало работы с Go",
    description:
      "Изучите основы программирования на Go, установку и вашу первую программу.",
    level: "Начинающий",
    duration: "30 мин",
    category: "basics",
    order: 1,
    is_free: true,
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
  {
    slug: "variables-and-types",
    title: "Переменные и типы данных",
    description:
      "Изучите систему типов Go, переменные, константы и базовые типы данных.",
    level: "Начинающий",
    duration: "45 мин",
    category: "basics",
    order: 2,
    is_free: true,
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
];

export async function seedDatabase() {
  try {
    console.log("Creating tutorials table...");
    await createTutorialsTable();

    console.log("Seeding tutorials...");
    for (const tutorial of tutorialsData) {
      try {
        await createTutorial(tutorial);
        console.log(`Created tutorial: ${tutorial.title}`);
      } catch (error) {
        // Skip if tutorial already exists (duplicate slug)
        const err = error as { code?: string; message?: string };
        if (err?.code === "23505" || err?.message?.includes("duplicate")) {
          console.log(`Tutorial already exists: ${tutorial.title} - skipping`);
        } else {
          throw error;
        }
      }
    }

    // Seed examples
    const examplesData = [
      {
        slug: "hello-world",
        title: "Привет, мир",
        description: "Простая программа Hello World для начала работы с Go.",
        code: `package main

import "fmt"

func main() {
    fmt.Println("Привет, мир!")
}`,
        language: "go",
        category: "Основы",
        order: 1,
      },
      {
        slug: "variables",
        title: "Переменные и константы",
        description: "Работа с различными типами переменных и констант в Go.",
        code: `package main

import "fmt"

func main() {
    // Объявление переменных
    var name string = "Golang"
    age := 13  // Короткая форма
    
    // Константы
    const pi = 3.14159
    
    fmt.Printf("Язык: %s, Возраст: %d лет\\n", name, age)
    fmt.Printf("Pi = %.2f\\n", pi)
}`,
        language: "go",
        category: "Основы",
        order: 2,
      },
    ];

    for (const example of examplesData) {
      try {
        await createExample(example);
        console.log(`Created example: ${example.title}`);
      } catch (error) {
        const err = error as { code?: string; message?: string };
        if (err?.code === "23505" || err?.message?.includes("duplicate")) {
          console.log(`Example already exists: ${example.title} - skipping`);
        } else {
          throw error;
        }
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

export default function Reference() {
  const sections = [
    {
      title: "Базовый синтаксис",
      items: [
        {
          name: "Объявление пакета",
          syntax: "package main",
          description:
            "Каждый файл Go начинается с объявления пакета. 'main' особенный - он определяет исполняемую программу.",
        },
        {
          name: "Оператор импорта",
          syntax: 'import "fmt"',
          description:
            "Импортирует внешние пакеты. Используйте скобки для множественного импорта.",
        },
        {
          name: "Объявление функции",
          syntax: "func functionName(param type) returnType { }",
          description:
            "Определяет функцию с параметрами и типом возвращаемого значения.",
        },
        {
          name: "Объявление переменной",
          syntax: "var name type = value",
          description:
            "Объявляет переменную с явным типом. Можно опустить тип для автоматического вывода типа.",
        },
        {
          name: "Краткое объявление",
          syntax: "name := value",
          description:
            "Краткое объявление переменной с выводом типа. Работает только внутри функций.",
        },
      ],
    },
    {
      title: "Типы данных",
      items: [
        {
          name: "Базовые типы",
          syntax:
            "bool, string, int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, byte, rune, float32, float64, complex64, complex128",
          description: "Встроенные базовые типы данных Go.",
        },
        {
          name: "Массивы",
          syntax: "[5]int{1, 2, 3, 4, 5}",
          description:
            "Массивы фиксированного размера. Размер является частью типа.",
        },
        {
          name: "Срезы",
          syntax: "[]int{1, 2, 3}",
          description:
            "Динамические массивы. Используются чаще обычных массивов.",
        },
        {
          name: "Карты",
          syntax: 'map[string]int{"key": 42}',
          description: "Хеш-таблицы/словари. Пары ключ-значение.",
        },
        {
          name: "Структуры",
          syntax: "type Person struct { Name string; Age int }",
          description: "Пользовательские типы, группирующие связанные данные.",
        },
        {
          name: "Указатели",
          syntax: "*int, &variable",
          description:
            "Ссылки на адреса памяти. Используйте & для получения адреса, * для разыменования.",
        },
      ],
    },
    {
      title: "Управление потоком",
      items: [
        {
          name: "Условный оператор if",
          syntax: "if condition { } else if condition { } else { }",
          description:
            "Условное выполнение. Скобки вокруг условия не требуются.",
        },
        {
          name: "Оператор switch",
          syntax: "switch value { case 1: ...; case 2: ...; default: ... }",
          description:
            "Многовариантное ветвление. По умолчанию нет провала между case.",
        },
        {
          name: "Цикл for",
          syntax: "for i := 0; i < 10; i++ { }",
          description:
            "Единственная циклическая конструкция в Go. Может использоваться как while.",
        },
        {
          name: "Цикл range",
          syntax: "for index, value := range slice { }",
          description: "Итерация по массивам, срезам, картам или каналам.",
        },
        {
          name: "Defer",
          syntax: "defer function()",
          description:
            "Откладывает выполнение функции до возврата из окружающей функции.",
        },
      ],
    },
    {
      title: "Функции",
      items: [
        {
          name: "Базовая функция",
          syntax: "func add(a, b int) int { return a + b }",
          description: "Функция с параметрами и возвращаемым значением.",
        },
        {
          name: "Множественные возвращаемые значения",
          syntax: "func divide(a, b int) (int, error) { }",
          description:
            "Функции могут возвращать несколько значений. Обычно значение + ошибка.",
        },
        {
          name: "Именованные возвращаемые значения",
          syntax: "func divide(a, b int) (result int, err error) { }",
          description:
            "Возвращаемые значения могут быть именованными и использоваться как переменные.",
        },
        {
          name: "Вариативная функция",
          syntax: "func sum(nums ...int) int { }",
          description: "Функция, принимающая переменное количество аргументов.",
        },
        {
          name: "Анонимная функция",
          syntax: "func(x int) int { return x * 2 }",
          description: "Функция без имени. Может быть присвоена переменной.",
        },
      ],
    },
    {
      title: "Методы и интерфейсы",
      items: [
        {
          name: "Объявление метода",
          syntax: "func (r receiver) methodName() returnType { }",
          description: "Прикрепление методов к типам с помощью приёмников.",
        },
        {
          name: "Приёмник-указатель",
          syntax: "func (r *Type) methodName() { }",
          description:
            "Используйте приёмник-указатель для изменения приёмника или для больших структур.",
        },
        {
          name: "Объявление интерфейса",
          syntax: "type Stringer interface { String() string }",
          description:
            "Интерфейсы определяют наборы методов. Реализуются неявно.",
        },
        {
          name: "Пустой интерфейс",
          syntax: "interface{}",
          description:
            "Может содержать значения любого типа. Аналогично Object в других языках.",
        },
      ],
    },
    {
      title: "Параллелизм",
      items: [
        {
          name: "Горутина",
          syntax: "go functionCall()",
          description: "Запуск новой горутины (лёгкого потока).",
        },
        {
          name: "Создание канала",
          syntax: "ch := make(chan int)",
          description: "Создание канала для коммуникации между горутинами.",
        },
        {
          name: "Буферизованный канал",
          syntax: "ch := make(chan int, 10)",
          description: "Канал с буферной ёмкостью.",
        },
        {
          name: "Операции с каналами",
          syntax: "ch <- value; value := <-ch",
          description: "Отправка в канал и получение из канала.",
        },
        {
          name: "Оператор select",
          syntax:
            "select { case <-ch1: ...; case ch2 <- value: ...; default: ... }",
          description: "Ожидание множественных операций с каналами.",
        },
        {
          name: "Закрытие канала",
          syntax: "close(ch)",
          description:
            "Закрытие канала для сигнализации о том, что больше значений не будет отправлено.",
        },
      ],
    },
    {
      title: "Обработка ошибок",
      items: [
        {
          name: "Интерфейс error",
          syntax: "type error interface { Error() string }",
          description:
            "Встроенный интерфейс для представления ошибочных состояний.",
        },
        {
          name: "Создание ошибок",
          syntax: 'errors.New("сообщение об ошибке")',
          description: "Создание простых значений ошибок.",
        },
        {
          name: "Проверка ошибок",
          syntax: "if err != nil { }",
          description: "Идиоматичный способ проверки ошибок в Go.",
        },
        {
          name: "Пользовательская ошибка",
          syntax:
            "type MyError struct { ... }; func (e MyError) Error() string { }",
          description:
            "Создание пользовательских типов ошибок путём реализации метода Error().",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Справочник языка Go
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Краткий справочник по синтаксису Go, типам и языковым конструкциям.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📋 Содержание
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Reference Sections */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              id={section.title.toLowerCase().replace(/\s+/g, "-")}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 px-6 py-4">
                <h3 className="text-2xl font-bold text-white">
                  {section.title}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4 mb-3">
                        <code className="text-green-400 text-sm font-mono">
                          {item.syntax}
                        </code>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            📚 Дополнительные ресурсы
          </h3>
          <p className="text-green-100 mb-6">
            Изучите больше ресурсов Go для углубления понимания.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://golang.org/doc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Официальная документация
            </a>
            <a
              href="https://pkg.go.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Документация пакетов
            </a>
            <a
              href="https://golang.org/ref/spec"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Спецификация языка
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

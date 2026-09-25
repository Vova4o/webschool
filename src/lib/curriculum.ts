export type CurriculumStage = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
};

export type CurriculumLesson = {
  slug: string;
  stageId: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  sourcePath: string;
  command: string;
  outcomes: string[];
  content: string;
  exercise: string;
  check: string;
};

export const curriculumStages: CurriculumStage[] = [
  { id: "foundation", eyebrow: "01 · ОСНОВЫ", title: "Первые программы", description: "Синтаксис, ветвления, циклы и простые структуры данных.", accent: "#6ee7b7" },
  { id: "building-blocks", eyebrow: "02 · ИНСТРУМЕНТЫ", title: "Функции и коллекции", description: "Разбиваем задачи на функции и обрабатываем наборы данных.", accent: "#60a5fa" },
  { id: "design", eyebrow: "03 · ПРОЕКТИРОВАНИЕ", title: "Типы и надёжность", description: "Моделируем предметную область, интерфейсы и ошибки.", accent: "#c084fc" },
  { id: "engineering", eyebrow: "04 · ИНЖЕНЕРИЯ", title: "Параллельность и качество", description: "Координируем работу горутин и проверяем поведение тестами.", accent: "#fb923c" },
  { id: "projects", eyebrow: "05 · ПРАКТИКА", title: "Проекты и производительность", description: "Применяем язык к реальным приложениям и измеряем результат.", accent: "#f472b6" },
];

export const curriculumLessons: CurriculumLesson[] = [
  {
    slug: "variables-and-output", stageId: "foundation", title: "Переменные и вывод", description: "Объявляем значения, выбираем типы и выводим полезные данные.", duration: "25 мин", level: "Начальный", sourcePath: "src/lectures/exercise/variables/variables.go", command: "go run main.go",
    outcomes: ["Объявлять переменные разными способами", "Подбирать типы для строк, чисел и символов", "Форматировать простой вывод"],
    content: `## Данные начинаются с переменных
Переменная связывает имя со значением. Короткое объявление удобно внутри функций, а \`var\` позволяет отдельно показать тип или объявить значение до присваивания.

\`\`\`go
package main

import "fmt"

func main() {
	name := "Мира"
	pages := 248
	weeks := 4
	perWeek := (pages + weeks - 1) / weeks
	fmt.Printf("%s: %d страниц, примерно %d в неделю\\n", name, pages, perWeek)
}
\`\`\`

Для маленьких программ выбирайте тип по смыслу: текст хранится в \`string\`, целый счёт — в \`int\`, вычисленные данные можно сохранять отдельно. Форматирование помогает превратить значения в понятный отчёт.`,
    exercise: "Напишите консольную сводку о прочитанной книге: задайте название и число страниц, вычислите примерное число страниц в неделю для плана на четыре недели и выведите отчёт.",
    check: "`go run main.go` выводит название и число страниц; недельный план равен округлённому вверх делению страниц на четыре.",
  },
  {
    slug: "conditions-and-loops", stageId: "foundation", title: "Условия и циклы", description: "Выбираем ветку выполнения и повторяем операции для каждого элемента.", duration: "35 мин", level: "Начальный", sourcePath: "src/lectures/exercise/if-else/if-else.go", command: "go run main.go", outcomes: ["Строить if/else без лишних условий", "Повторять вычисления циклом", "Использовать switch для выбора варианта"],
    content: `## Управляйте ходом программы
Условие выбирает действие по данным, а цикл повторяет его для последовательности. Часто достаточно одного цикла и одного решения внутри него.

\`\`\`go
package main

import "fmt"

func main() {
	weight := 3
	price := 120
	if weight > 1 {
		price += (weight - 1) * 25
	}
	fmt.Println("доставка:", price)
	for n := 1; n <= 5; n++ {
		kind := "нечётное"
		if n%2 == 0 {
			kind = "чётное"
		}
		fmt.Println(n, kind)
	}
}
\`\`\`

Начните с перечисления случаев и их границ. Цепочка \`if / else if\` подходит для диапазонов, а \`switch\` — для дискретных вариантов. У цикла должны быть понятные начало, условие завершения и изменение счётчика.`,
    exercise: "Смоделируйте цену доставки: бесплатно от заданного порога, иначе базовая цена плюс надбавка за каждый килограмм сверх первого. Дополнительно выведите чётность чисел от 1 до 20.",
    check: "Проверьте значения ровно на пороге и по обе стороны от него; цикл печатает 20 строк и завершается.",
  },
  {
    slug: "functions-and-results", stageId: "building-blocks", title: "Функции и результаты", description: "Выделяем повторяемые действия в функции с понятными входами и выходами.", duration: "35 мин", level: "Начальный", sourcePath: "src/lectures/exercise/functions/functions.go", command: "go run main.go", outcomes: ["Передавать аргументы", "Возвращать результаты", "Использовать несколько возвращаемых значений"],
    content: `## Функция описывает один шаг
Аргументы делают функцию настраиваемой, а результат позволяет использовать вычисление дальше. Несколько значений удобно возвращать вместе, например частное и остаток.

\`\`\`go
package main

import "fmt"

func ticketTotal(prices ...int) int {
	total := 0
	for _, price := range prices {
		total += price
	}
	return total
}

func dailyBudget(budget, days int) (int, int) {
	return budget / days, budget % days
}

func main() {
	total := ticketTotal(1200, 900, 900)
	daily, remainder := dailyBudget(10000, 3)
	fmt.Println("билеты:", total, "в день:", daily, "остаток:", remainder)
}
\`\`\`

Сигнатура функции — контракт: в ней видны входы и выходы. Короткие функции легче проверить и повторно использовать. Несколько результатов удобны, когда операция естественно даёт пару связанных значений.`,
    exercise: "Сделайте набор функций для поездки: отформатируйте приветствие участнику, вычислите стоимость трёх билетов, затем разделите бюджет на число дней с возвратом дневного лимита и остатка.",
    check: "Каждая функция вызвана из main; билеты 1200, 900 и 900 дают 3000, а бюджет 10000 на 3 дня даёт лимит 3333 и остаток 1.",
  },
  {
    slug: "arrays-and-slices", stageId: "building-blocks", title: "Массивы и срезы", description: "Храним упорядоченные значения и безопасно добавляем новые элементы.", duration: "40 мин", level: "Начальный", sourcePath: "src/lectures/exercise/slices/slices.go", command: "go run main.go", outcomes: ["Различать массив и срез", "Перебирать элементы", "Добавлять элементы через append"],
    content: `## Срез растёт вместе с задачей
Массив имеет фиксированную длину. Срез ссылается на последовательность и может получить новый backing array при добавлении элементов через \`append\`.

\`\`\`go
package main

import "fmt"

func main() {
	minutes := []int{20, 30, 25, 15, 40}
	total := 0
	for _, value := range minutes {
		total += value
	}
	minutes = append(minutes, 30)
	fmt.Println("итого:", total, "среднее:", total/5, "дней:", len(minutes))
}
\`\`\`

Размер массива известен при объявлении. Срез подходит для меняющейся длины: \`append\` возвращает срез с новым элементом, и результат нужно присвоить обратно. Перебор через \`range\` даёт индекс и значение.`,
    exercise: "Соберите значения времени чтения в минутах за пять дней. Посчитайте сумму и среднее, добавьте ещё один день через append и выведите обновлённый список.",
    check: "Для значений 20, 30, 25, 15, 40 сумма равна 130, среднее — 26; после добавления 30 срез содержит шесть элементов.",
  },
  {
    slug: "maps-and-data-lookup", stageId: "building-blocks", title: "Карты и поиск по ключу", description: "Представляем словарь данных с быстрым доступом по ключу.", duration: "30 мин", level: "Начальный", sourcePath: "src/lectures/exercise/maps/maps.go", command: "go run main.go", outcomes: ["Создавать map с ключом и значением", "Проверять наличие ключа", "Обновлять и перебирать записи"],
    content: `## Когда значение ищут по имени
Карта связывает ключ со значением. В Go чтение возвращает также признак наличия, поэтому можно отличить отсутствующую запись от нулевого значения.

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

func main() {
	zones := map[string]int{"Казань": 3, "Томск": 7}
	if offset, ok := zones["Казань"]; ok {
		fmt.Println("смещение:", offset)
	}
	zones["Пермь"] = 5
	cities := make([]string, 0, len(zones))
	for city := range zones {
		cities = append(cities, city)
	}
	sort.Strings(cities)
	for _, city := range cities {
		fmt.Println(city, zones[city])
	}
}
\`\`\`

Порядок обхода map не определён. Для стабильного отчёта соберите ключи отдельно и отсортируйте их. Проверка \`value, ok := m[key]\` отличает отсутствующую запись от нулевого значения.`,
    exercise: "Создайте справочник названий городов и их часовых смещений. Найдите смещение по ключу, добавьте город и сформируйте алфавитный отчёт по записям.",
    check: "Поиск возвращает правильное смещение; неизвестный город обрабатывается явно, итоговый список отсортирован по названию.",
  },
  {
    slug: "structs-and-methods", stageId: "design", title: "Структуры и методы", description: "Собираем связанные поля в собственный тип и описываем его поведение.", duration: "40 мин", level: "Начальный · средний", sourcePath: "src/lectures/exercise/structs/structs.go", command: "go run main.go", outcomes: ["Описывать struct", "Создавать значения типа", "Передавать структуру в функции"],
    content: `## Данные одной сущности живут вместе
Структура группирует поля одной сущности. Методы позволяют задать вычисления рядом с моделью и выразить ограничение через значение её свойств.

\`\`\`go
package main

import "fmt"

type Parcel struct {
	Length, Width, Height int
}

func (p Parcel) Volume() int {
	return p.Length * p.Width * p.Height
}

func (p Parcel) Fits(maxVolume int) bool {
	return p.Volume() <= maxVolume
}

func main() {
	parcel := Parcel{Length: 30, Width: 20, Height: 10}
	fmt.Println("объём:", parcel.Volume(), "лимит 7000:", parcel.Fits(7000), "лимит 5000:", parcel.Fits(5000))
}
\`\`\`

Методы делают расчёт объёма и проверку ограничения частью модели посылки. Значение передаётся копией; указатель нужен, если операция меняет исходный объект.`,
    exercise: "Опишите посылку с длиной, шириной и высотой. Добавьте методы расчёта объёма и проверки, проходит ли она через сортировочный лимит.",
    check: "Посылка 30×20×10 имеет объём 6000 кубических сантиметров, проходит лимит 7000 и не проходит лимит 5000.",
  },
  {
    slug: "interfaces-and-embedding", stageId: "design", title: "Интерфейсы и композиция", description: "Описываем возможности типов и передаём разные реализации одной функции.", duration: "45 мин", level: "Средний", sourcePath: "src/lectures/exercise/interfaces/interfaces.go", command: "go run main.go", outcomes: ["Определять интерфейс по нужным методам", "Реализовывать интерфейс неявно", "Комбинировать типы через embedding"],
    content: `## Интерфейс задаёт необходимое поведение
Функции удобнее зависеть от действия, которое ей нужно, чем от конкретного типа. Тип реализует интерфейс автоматически, если у него есть требуемые методы.

\`\`\`go
package main

import "fmt"

type Priced interface {
	DeliveryPrice() int
}

type Route struct{ Distance int }

type Envelope struct{ Route }
func (e Envelope) DeliveryPrice() int { return 100 + e.Distance*2 }

type Box struct {
	Route
	Weight int
}
func (b Box) DeliveryPrice() int { return 200 + b.Distance*2 + b.Weight*10 }

func printPrice(item Priced) {
	fmt.Println(item.DeliveryPrice())
}

func main() {
	printPrice(Envelope{Route: Route{Distance: 5}})
	printPrice(Box{Route: Route{Distance: 5}, Weight: 3})
}
\`\`\`

Интерфейс описывает набор методов, нужных потребителю. Реализация не требует ключевого слова: достаточно определить эти методы. Встраивание типа помогает собирать поведение из небольших частей.`,
    exercise: "Опишите интерфейс объекта, который оценивает стоимость доставки. Реализуйте его для конверта и посылки; одна функция расчёта должна принять оба типа и показать оценки.",
    check: "Одна функция принимает оба типа через интерфейс; конверт и посылка возвращают разные ожидаемые значения по своим правилам тарификации.",
  },
  {
    slug: "errors-and-validation", stageId: "design", title: "Ошибки и проверка входа", description: "Возвращаем ошибки вызывающему коду и тестируем корректные и неверные данные.", duration: "45 мин", level: "Средний", sourcePath: "src/lectures/exercise/errors/errors.go", command: "go run main.go", outcomes: ["Сигнализировать об ошибке через возвращаемое значение", "Проверять формат и диапазоны", "Покрывать успех и отказ тестами"],
    content: `## Ошибка — часть результата
Функция разбора должна вернуть либо данные, либо объяснимую причину отказа. Проверяйте не только возможность преобразовать число, но и допустимость самого значения.

\`\`\`go
package main

import (
	"fmt"
	"strconv"
)

func parsePort(text string) (int, error) {
	port, err := strconv.Atoi(text)
	if err != nil {
		return 0, fmt.Errorf("invalid port %q: %w", text, err)
	}
	if port < 1 || port > 65535 {
		return 0, fmt.Errorf("port out of range: %d", port)
	}
	return port, nil
}

func main() {
	port, err := parsePort("8080")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("port:", port)
}
\`\`\`

Функция, которая может не справиться, возвращает значение ошибки. Вызывающий код решает, как её обработать. Проверяйте формат и ограничения отдельно; тесты должны покрывать обычный путь и отказные случаи.`,
    exercise: "Напишите валидатор кода бронирования формата `AB-1234`: две заглавные латинские буквы, дефис и четыре цифры. Возвращайте объяснимую ошибку и покройте тестами правильные и неправильные варианты.",
    check: "`go test ./...` проходит; корректный код принимается, а длина, разделитель, регистр и недопустимый суффикс проверяются.",
  },
  {
    slug: "goroutines-and-channels", stageId: "engineering", title: "Горутины и каналы", description: "Запускаем независимые вычисления и собираем результаты через канал.", duration: "50 мин", level: "Средний", sourcePath: "src/lectures/exercise/channels/channels.go", command: "go run main.go", outcomes: ["Запускать функцию в goroutine", "Передавать результат по каналу", "Собирать все ответы до завершения"],
    content: `## Параллельная работа требует сбора результата
Горутина позволяет выполнять независимое вычисление отдельно. Канал передаёт результат, а число отправленных задач помогает понять, сколько ответов нужно получить.

\`\`\`go
package main

import (
	"fmt"
	"sync"
)

func main() {
	distances := []int{60, 90}
	results := make(chan int, len(distances))
	var workers sync.WaitGroup
	for _, distance := range distances {
		workers.Add(1)
		go func(km int) {
			defer workers.Done()
			results <- km / 30
		}(distance)
	}
	workers.Wait()
	close(results)
	total := 0
	for hours := range results {
		total += hours
	}
	fmt.Println("общее время:", total)
}
\`\`\`

Передавайте значение каждой итерации аргументом горутины, чтобы вычисление использовало ожидаемые данные. Отправитель и получатель согласуют число сообщений; закрывайте канал только после завершения отправителей.`,
    exercise: "Рассчитайте длительности маршрутов независимо: каждая горутина получает расстояние и скорость, отправляет время в канал, а main складывает результаты.",
    check: "Для маршрутов 60 и 90 км при скорости 30 км/ч итог равен 5 часам; получено ровно по одному ответу для каждого маршрута.",
  },
  {
    slug: "synchronization-and-testing", stageId: "engineering", title: "Синхронизация и тесты", description: "Согласуем конкурентную работу и закрепляем поведение автоматическими проверками.", duration: "50 мин", level: "Средний", sourcePath: "src/lectures/exercise/sync/sync.go", command: "go run main.go", outcomes: ["Дожидаться завершения групп задач", "Считать слова конкурентно", "Проверять конкурентную функцию тестом"],
    content: `## Координация важнее числа горутин
Если несколько горутин изменяют общее состояние, нужен механизм синхронизации. Канал может доставлять частичные итоги владельцу результата; WaitGroup полезен, когда важно дождаться завершения всех работников.

\`\`\`go
package main

import (
	"fmt"
	"sync"
)

func runeCount(text string) int { return len([]rune(text)) }

func main() {
	words := []string{"go", "мир"}
	results := make(chan int, len(words))
	var workers sync.WaitGroup
	for _, word := range words {
		workers.Add(1)
		go func(value string) {
			defer workers.Done()
			results <- runeCount(value)
		}(word)
	}
	workers.Wait()
	close(results)
	total := 0
	for count := range results {
		total += count
	}
	fmt.Println("символов:", total)
}
\`\`\`

WaitGroup сигнализирует о завершении группы горутин. Для общего счётчика нужна защита от одновременной записи; альтернативно работники отправляют частичные ответы через канал. Тестируйте функцию подсчёта отдельно от ввода.`,
    exercise: "Распределите расчёт общей длины слов по горутинам. Каждая задача возвращает число Unicode-символов; соберите итог и покройте функцию подсчёта табличными тестами.",
    check: "Тесты для пустой строки, ASCII-слова и `мир` проходят; длина фразы `go мир` равна 5, `go test -race ./...` не находит гонок.",
  },
  {
    slug: "expense-csv-project", stageId: "projects", title: "Проект: отчёт расходов из CSV", description: "Параллельно анализируем выгрузки, проверяем строки и сравниваем расходы по файлам.", duration: "60 мин", level: "Средний", sourcePath: "src/lectures/exercise/goroutines/goroutines.go", command: "go run main.go", outcomes: ["Читать записи CSV", "Проверять формат и значения каждой строки", "Сводить результаты независимых отчётов"],
    content: `## Каждая выгрузка — отдельный отчёт
CSV содержит записи с полями. Для каждой строки проверяйте наличие категории и целочисленную неотрицательную сумму; повреждённый CSV возвращайте как ошибку. Независимые документы можно анализировать параллельно, собирая готовые сводки в одном месте.

\`\`\`go
package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"strconv"
	"strings"
	"sync"
)

type summary struct { cents, invalid int }

func summarizeCSV(text string) (summary, error) {
	var out summary
	reader := csv.NewReader(strings.NewReader(text))
	reader.FieldsPerRecord = -1
	if _, err := reader.Read(); err != nil {
		return out, fmt.Errorf("read CSV header: %w", err)
	}
	for {
		record, err := reader.Read()
		if err == io.EOF {
			return out, nil
		}
		if err != nil {
			return out, fmt.Errorf("read CSV record: %w", err)
		}
		if len(record) != 2 || strings.TrimSpace(record[0]) == "" {
			out.invalid++
			continue
		}
		cents, err := strconv.Atoi(record[1])
		if err != nil || cents < 0 {
			out.invalid++
			continue
		}
		out.cents += cents
	}
}

func main() {
	documents := []string{
		"category,cents\\nfood,1200\\ntravel,300\\nfood,invalid",
		"category,cents\\nbooks,800",
		"category,cents\\nrefund,-100",
	}
	results := make(chan summary, len(documents))
	var workers sync.WaitGroup
	for _, document := range documents {
		workers.Add(1)
		go func(text string) {
			defer workers.Done()
			item, err := summarizeCSV(text)
			if err != nil {
				log.Printf("summarize CSV: %v", err)
				return
			}
			results <- item
		}(document)
	}
	workers.Wait()
	close(results)
	totalCents, rejected := 0, 0
	for item := range results {
		totalCents += item.cents
		rejected += item.invalid
	}
	fmt.Println("расходы в центах:", totalCents, "отклонённых записей:", rejected)
}
\`\`\`

Анализируйте строки внутри одного CSV последовательно, а разные выгрузки запускайте в отдельных горутинах. Возвращайте сумму и число отклонённых строк как локальный результат, не используя общий изменяемый счётчик.`,
    exercise: "Подготовьте несколько CSV выгрузок с колонками `category,cents`. Параллельно обработайте их, отклоняя записи без категории, с отрицательной суммой или нечисловым значением; выведите общие расходы и количество отклонений.",
    check: "На учебных строках с суммами 1200, 300 и 800 центов общий итог равен 2300; нечисловая и отрицательная записи дают ровно два отклонения. Повторный запуск даёт тот же результат.",
  },
  {
    slug: "events-json-api-project", stageId: "projects", title: "Проект: JSON API событий", description: "Строим каталог событий и измеряем задержку чтения при росте набора данных.", duration: "90 мин", level: "Продвинутый", sourcePath: "src/projects/keiko/README.md", command: "go run main.go", outcomes: ["Возвращать типизированный JSON через HTTP", "Измерять время чтения каталога", "Сравнивать показатели на одинаковой нагрузке"],
    content: `## Чтение каталога должно быть измеримым
Маршрут связывает HTTP-запрос с обработчиком, а JSON-кодировщик преобразует типизированные записи в ответ. Замерьте задержку чтения на фиксированном наборе событий до и после оптимизации, не меняя объём входных данных.

\`\`\`go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type Event struct {
	ID string
	Name string
	StartsAt string
}

var events = []Event{
	{ID: "evt-1", Name: "Кинопоказ", StartsAt: "2026-10-01T18:00:00Z"},
	{ID: "evt-2", Name: "Лекция", StartsAt: "2026-10-02T16:30:00Z"},
}

func eventsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	started := time.Now()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Printf("encode events response: %v", err)
		return
	}
	log.Printf("events read completed in %s", time.Since(started))
}

func main() {
	http.HandleFunc("/events", eventsHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(fmt.Errorf("serve events API: %w", err))
	}
}
\`\`\`

Сначала получите базовые p50 и p95, затем меняйте один участок чтения за раз и повторяйте ту же серию запросов. Измеряйте задержку обработчика и отдельно следите за кодами ответа; содержимое событий в лог не записывайте.`,
    exercise: "Создайте JSON API `GET /events`, возвращающее события с идентификатором, названием и временем начала. Добавьте фильтр по дате и проведите замер p50/p95 на каталоге из 10 000 записей. Примените одно улучшение пути чтения и сравните метрики при том же числе запросов.",
    check: "Список и фильтр возвращают валидный JSON с ожидаемыми событиями; результаты до и после содержат p50 и p95 на одинаковом объёме данных и запросов, все ответы успешны.",
  },
];

export function getCurriculumLesson(slug: string): CurriculumLesson | undefined {
  return curriculumLessons.find((lesson) => lesson.slug === slug);
}

export function getNextCurriculumLesson(slug: string): CurriculumLesson | undefined {
  const index = curriculumLessons.findIndex((lesson) => lesson.slug === slug);
  return index >= 0 ? curriculumLessons[index + 1] : undefined;
}

export function getLessonNumber(slug: string): number | undefined {
  const index = curriculumLessons.findIndex((lesson) => lesson.slug === slug);
  return index >= 0 ? index + 1 : undefined;
}

import Link from "next/link";
import type { Metadata } from "next";
import { curriculumLessons } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Краткий справочник Go | WebSchool",
  description: "Основной синтаксис Go с короткими примерами и ссылками на практические уроки.",
};

const sections = [
  {
    id: "variables",
    number: "01",
    title: "Переменные и типы",
    description: "Объявляйте значения явно или используйте короткую форму внутри функций.",
    lesson: "variables-and-output",
    items: [
      { title: "Короткое объявление", code: 'name := "Мира"\ncount := 3', note: "Тип выводится из значения. Форма := доступна внутри функций." },
      { title: "Объявление через var", code: 'var city string = "Казань"\nvar ready bool', note: "Без начального значения переменная получает нулевое значение своего типа." },
      { title: "Константа", code: 'const maxRetries = 5', note: "Значение константы задаётся при объявлении и не меняется." },
    ],
  },
  {
    id: "flow",
    number: "02",
    title: "Условия и циклы",
    description: "Ветвление и повторение строятся на компактных конструкциях языка.",
    lesson: "conditions-and-loops",
    items: [
      { title: "Условие", code: 'if score >= 60 {\n\tfmt.Println("зачёт")\n} else {\n\tfmt.Println("повторить")\n}', note: "Круглые скобки вокруг условия не нужны; фигурные скобки обязательны." },
      { title: "Цикл со счётчиком", code: "for i := 0; i < 3; i++ {\n\tfmt.Println(i)\n}", note: "for — единственная конструкция цикла в Go." },
      { title: "Перебор среза", code: "for index, value := range values {\n\tfmt.Println(index, value)\n}", note: "Если одна из переменных не нужна, замените её на _." },
    ],
  },
  {
    id: "functions",
    number: "03",
    title: "Функции",
    description: "Делите программу на небольшие действия с ясными входами и результатами.",
    lesson: "functions-and-results",
    items: [
      { title: "Параметры и результат", code: "func add(a, b int) int {\n\treturn a + b\n}", note: "Соседние параметры могут использовать общий тип." },
      { title: "Несколько результатов", code: "func split(total, parts int) (int, int) {\n\treturn total / parts, total % parts\n}", note: "Несколько возвращаемых значений часто используют для результата и ошибки." },
    ],
  },
  {
    id: "collections",
    number: "04",
    title: "Срезы и карты",
    description: "Выбирайте срез для упорядоченного списка, map — для доступа по ключу.",
    lesson: "arrays-and-slices",
    items: [
      { title: "Срез", code: "scores := []int{8, 10, 9}\nscores = append(scores, 7)", note: "append возвращает срез; сохраняйте результат обратно." },
      { title: "Карта и проверка ключа", code: 'points := map[string]int{"Мира": 12}\nvalue, ok := points["Мира"]', note: "ok показывает, найден ли ключ, даже если значение равно нулю." },
    ],
  },
  {
    id: "structs",
    number: "05",
    title: "Структуры и методы",
    description: "Связывайте данные и поведение в собственных типах.",
    lesson: "structs-and-methods",
    items: [
      { title: "Структура", code: "type Book struct {\n\tTitle string\n\tPages int\n}", note: "Поля структуры описывают данные одного значения." },
      { title: "Метод", code: "func (b Book) Summary() string {\n\treturn b.Title\n}", note: "Метод объявляется с получателем перед именем функции." },
    ],
  },
  {
    id: "errors",
    number: "06",
    title: "Ошибки",
    description: "Go передаёт ошибки как значения и предлагает явно проверять результат.",
    lesson: "errors-and-validation",
    items: [
      { title: "Проверка ошибки", code: 'value, err := strconv.Atoi("42")\nif err != nil {\n\treturn err\n}', note: "Проверяйте err сразу после вызова, который его возвращает." },
      { title: "Создание ошибки", code: 'return fmt.Errorf("прочитать файл: %w", err)', note: "%w оборачивает исходную ошибку, сохраняя возможность её проверить." },
    ],
  },
  {
    id: "concurrency",
    number: "07",
    title: "Горутины и каналы",
    description: "Запускайте работу параллельно и передавайте данные между задачами.",
    lesson: "goroutines-and-channels",
    items: [
      { title: "Запуск горутины", code: "go process(item)", note: "Вызов выполняется конкурентно; продумайте, как дождаться результата." },
      { title: "Передача через канал", code: "results := make(chan string)\ngo func() { results <- load() }()\nvalue := <-results", note: "Небуферизованный канал связывает отправителя с получателем." },
    ],
  },
];

const lessonTitles = new Map(curriculumLessons.map((lesson) => [lesson.slug, lesson.title]));

export default function Reference() {
  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <section className="relative overflow-hidden bg-[#0b1727] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-36 h-[28rem] w-[28rem] rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Под рукой во время практики</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Краткий справочник Go</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Синтаксис, к которому удобно вернуться: короткие объяснения, небольшие примеры и переходы к урокам с практикой.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-200">Навигация</p>
            <p className="mt-3 text-3xl font-semibold">{sections.length}<span className="ml-2 text-base font-normal text-slate-300">тем</span></p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Выберите раздел, чтобы перейти к нужной конструкции.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <nav aria-label="Разделы справочника" className="mb-10 grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eaf7f3] hover:text-emerald-900"><span className="font-mono text-xs text-emerald-700">{section.number}</span>{section.title}<span aria-hidden="true" className="ml-auto text-slate-400 transition group-hover:translate-x-1">→</span></a>)}
        </nav>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-38px_rgba(15,23,42,0.35)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
                <div className="flex items-start gap-4"><span className="rounded-xl bg-[#d8f5e9] px-3 py-2 font-mono text-sm font-bold text-emerald-900">{section.number}</span><div><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{section.description}</p></div></div>
                {lessonTitles.has(section.lesson) && <Link href={`/tutorials/${section.lesson}`} className="ml-14 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 sm:ml-0">К уроку: {lessonTitles.get(section.lesson)} <span aria-hidden="true">↗</span></Link>}
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
                {section.items.map((item) => <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfcfc]">
                  <div className="flex items-center gap-2 border-b border-slate-800 bg-[#111e2e] px-4 py-3"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose-300"/><span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-300"/><span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-300"/><h3 className="ml-2 text-xs font-semibold text-slate-200">{item.title}</h3></div>
                  <pre className="overflow-x-auto bg-[#0b1727] px-4 py-4 text-sm leading-6 text-emerald-100"><code>{item.code}</code></pre>
                  <p className="px-4 py-4 text-sm leading-6 text-slate-600">{item.note}</p>
                </article>)}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-8 flex flex-col gap-4 rounded-[1.6rem] bg-[#0b1727] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">Закрепите синтаксис</p><h2 className="mt-2 text-xl font-semibold">Короткая справка — рядом, практика — в уроке</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Пройдите темы по порядку и примените конструкции в небольших программах.</p></div>
          <Link href="/tutorials" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-300 px-5 py-3 text-sm font-bold text-[#0b1727] transition hover:bg-emerald-200">К маршруту обучения <span aria-hidden="true">→</span></Link>
        </aside>
      </section>
    </main>
  );
}

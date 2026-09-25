import Link from "next/link";
import type { Metadata } from "next";
import { curriculumLessons, curriculumStages, getLessonNumber } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Путь изучения Go | WebSchool",
  description: "Последовательный практический маршрут по Go: от первых переменных до HTTP-сервисов и измерения производительности.",
  openGraph: {
    title: "Путь изучения Go | WebSchool",
    description: "Последовательный практический маршрут по Go с упражнениями и проверяемыми результатами.",
  },
};

export default function Tutorials() {
  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <section className="relative overflow-hidden bg-[#0b1727] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Практический маршрут по Go
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">От первой строки<br className="hidden sm:block" /> к уверенной разработке</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Двигайтесь небольшими шагами: изучайте идею, применяйте её в упражнении и проверяйте результат по конкретным критериям.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"><strong className="text-white">{curriculumLessons.length}</strong> уроков</span>
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"><strong className="text-white">{curriculumStages.length}</strong> этапов</span>
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">Короткая теория + практика</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Карта обучения</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Пять этапов, один понятный путь</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Уроки идут в рекомендуемом порядке. Каждый следующий этап опирается на навыки, освоенные раньше.</p>
        </div>

        <div className="space-y-8">
          {curriculumStages.map((stage, stageIndex) => {
            const lessons = curriculumLessons.filter((lesson) => lesson.stageId === stage.id);
            return (
              <section key={stage.id} aria-labelledby={`stage-${stage.id}`} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_-38px_rgba(15,23,42,0.35)]">
                <div className="grid gap-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-[#0b1727]" style={{ backgroundColor: stage.accent }}>{String(stageIndex + 1).padStart(2, "0")}</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{stage.eyebrow}</p>
                      <h3 id={`stage-${stage.id}`} className="mt-1 text-2xl font-semibold tracking-tight">{stage.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{stage.description}</p>
                    </div>
                  </div>
                  <span className="ml-16 w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:ml-0">{lessons.length} {lessons.length === 1 ? "урок" : "урока"}</span>
                </div>
                <ol className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                  {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link href={`/tutorials/${lesson.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-lg bg-[#eaf7f3] px-2.5 py-1 font-mono text-xs font-bold text-emerald-800">УРОК {String(getLessonNumber(lesson.slug)).padStart(2, "0")}</span>
                          <span className="text-xs font-medium text-slate-500">{lesson.duration}</span>
                        </div>
                        <h4 className="mt-4 text-lg font-semibold leading-snug tracking-tight group-hover:text-emerald-800">{lesson.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.description}</p>
                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">После урока вы сможете</p>
                          <ul className="mt-2 space-y-1.5">
                            {lesson.outcomes.slice(0, 2).map((outcome) => <li key={outcome} className="flex gap-2 text-xs leading-5 text-slate-600"><span aria-hidden="true" className="mt-1 text-emerald-600">✓</span><span>{outcome}</span></li>)}
                          </ul>
                        </div>
                        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-emerald-800">Открыть урок <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}

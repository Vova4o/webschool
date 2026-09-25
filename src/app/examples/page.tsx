"use client";

import Link from "next/link";
import { useState } from "react";
import { curriculumLessons, curriculumStages } from "@/lib/curriculum";

const featuredSlugs = [
  "variables-and-output",
  "conditions-and-loops",
  "functions-and-results",
  "arrays-and-slices",
  "maps-and-data-lookup",
  "errors-and-validation",
  "goroutines-and-channels",
  "expense-csv-project",
];

const examples = featuredSlugs.flatMap((slug) => {
  const lesson = curriculumLessons.find((item) => item.slug === slug);
  const code = lesson?.content.match(/```go\s*\n([\s\S]*?)```/)?.[1]?.trim();
  if (!lesson || !code) return [];

  const stage = curriculumStages.find((item) => item.id === lesson.stageId);
  return [{ ...lesson, code, concept: stage?.title ?? "Практика" }];
});

function ExampleCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#07111f] shadow-inner shadow-black/20">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-rose-400" /><i className="h-2 w-2 rounded-full bg-amber-300" /><i className="h-2 w-2 rounded-full bg-emerald-300" /></span>
          <span>main.go</span>
        </div>
        <button type="button" onClick={copyCode} className="text-xs font-medium text-emerald-300 transition hover:text-emerald-200">
          {copied ? "Скопировано" : "Скопировать код"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-6 text-slate-100 sm:p-6 sm:text-sm"><code>{code}</code></pre>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <main>
      <section className="hero-shell relative isolate overflow-hidden">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="hero-glow hero-glow-one absolute -z-10" aria-hidden="true" />
        <div className="hero-glow hero-glow-two absolute -z-10" aria-hidden="true" />
        <div className="site-container hero-content py-16 sm:py-20 lg:py-24">
          <p className="eyebrow eyebrow-mint"><span className="status-dot" /> Примеры из программы</p>
          <h1 className="hero-title mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
            Смотрите на идею.<br /><span className="text-mint">Запускайте свой код.</span>
          </h1>
          <p className="hero-copy mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
            Небольшие самостоятельные программы показывают ключевые приёмы Go. Каждый пример взят из урока маршрута и готов к запуску.
          </p>
          <div className="hero-meta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span><span className="meta-mark">{examples.length}</span> примеров из уроков</span>
            <span>Каждый можно запустить локально</span>
          </div>
        </div>
        <div className="hero-bottom-line" aria-hidden="true" />
      </section>

      <section className="site-container py-16 sm:py-20">
        <div className="section-heading grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow eyebrow-ink">Практика в коде</p>
            <h2 className="section-title mt-4">Одна задача — один приём.</h2>
          </div>
          <p className="section-lead max-w-2xl md:justify-self-end">Сначала прочитайте пояснение, затем запустите программу командой из карточки. Полный урок поможет разобраться глубже и предложит упражнение.</p>
        </div>

        <div className="mt-10 space-y-6">
          {examples.map((example, index) => (
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-38px_rgba(15,23,42,.34)] sm:p-8" key={example.slug}>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-bold tracking-[.14em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{example.concept}</span>
                    <span className="text-xs text-slate-500">{example.duration}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-.035em] text-slate-950 sm:text-3xl">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{example.description}</p>
                </div>
                <Link href={`/tutorials/${example.slug}`} className="text-link inline-flex shrink-0 items-center gap-2">
                  Открыть урок <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <ExampleCode code={example.code} />
              <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-500">Запустить локально</p>
                  <code className="mt-1 inline-block rounded-md bg-white px-2.5 py-1 font-mono text-sm text-slate-900 shadow-sm">{example.command}</code>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">{example.outcomes.slice(0, 2).join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container pb-20 sm:pb-24">
        <div className="cta-panel relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="cta-shape" aria-hidden="true">go</div>
          <div className="relative max-w-2xl">
            <p className="eyebrow eyebrow-mint">Продолжайте маршрут</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Пример показывает шаг. Урок помогает пройти путь.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">Выберите тему, выполните упражнение и проверьте решение по понятным критериям.</p>
            <Link href="/tutorials" className="button-primary mt-7">Смотреть все уроки <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

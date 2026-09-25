import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { curriculumLessons, curriculumStages } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Go — практика, которая становится навыком",
  description:
    "Осваивайте Go шаг за шагом: короткие объяснения, собственные упражнения и проекты от первой программы до HTTP-сервиса.",
};

const lessons = curriculumLessons.slice(0, 12);

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <main>
        <section className="hero-shell relative isolate overflow-hidden">
          <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
          <div className="hero-glow hero-glow-one absolute -z-10" aria-hidden="true" />
          <div className="hero-glow hero-glow-two absolute -z-10" aria-hidden="true" />
          <div className="site-container hero-content grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-mint"><span className="status-dot" /> Практический путь в Go</p>
              <h1 className="hero-title mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]">
                Пишите на Go.<br />
                <span className="text-mint">Думайте системно.</span>
              </h1>
              <p className="hero-copy mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                От первой переменной до работающего сервиса — через небольшие шаги, понятные решения и код, который вы написали сами.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={lessons[0] ? `/tutorials/${lessons[0].slug}` : "/tutorials"} className="button-primary group">
                  Начать с первого урока <ArrowIcon />
                </Link>
                <Link href="#pathway" className="button-ghost">Посмотреть маршрут</Link>
              </div>
              <div className="hero-meta mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span><span className="meta-mark">{lessons.length}</span> уроков с практикой</span>
                <span><span className="meta-mark">{curriculumStages.length}</span> этапов роста</span>
                <span>Можно идти в своём темпе</span>
              </div>
            </div>

            <div className="terminal-wrap mx-auto w-full max-w-[540px] lg:ml-auto" aria-label="Пример Go-кода: небольшая программа считает результат">
              <div className="terminal-card">
                <div className="terminal-topbar">
                  <div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div>
                  <span className="terminal-filename">main.go</span>
                  <span className="terminal-language">GO</span>
                </div>
                <div className="terminal-body" aria-hidden="true">
                  <div className="code-line"><span className="line-no">01</span><code><span className="code-purple">package</span> main</code></div>
                  <div className="code-line"><span className="line-no">02</span><code /></div>
                  <div className="code-line"><span className="line-no">03</span><code><span className="code-purple">import</span> <span className="code-green">&quot;fmt&quot;</span></code></div>
                  <div className="code-line"><span className="line-no">04</span><code /></div>
                  <div className="code-line"><span className="line-no">05</span><code><span className="code-purple">type</span> <span className="code-cyan">Practice</span> <span className="code-purple">struct</span> {'{'}</code></div>
                  <div className="code-line"><span className="line-no">06</span><code>    Lessons <span className="code-cyan">int</span></code></div>
                  <div className="code-line"><span className="line-no">07</span><code>    Built   <span className="code-cyan">bool</span></code></div>
                  <div className="code-line"><span className="line-no">08</span><code>{'}'}</code></div>
                  <div className="code-line"><span className="line-no">09</span><code /></div>
                  <div className="code-line"><span className="line-no">10</span><code><span className="code-purple">func</span> <span className="code-yellow">main</span>() {'{'}</code></div>
                  <div className="code-line"><span className="line-no">11</span><code>    week := <span className="code-cyan">Practice</span>{'{'}Lessons: <span className="code-orange">{lessons.length}</span>, Built: <span className="code-orange">true</span>{'}'}</code></div>
                  <div className="code-line"><span className="line-no">12</span><code>    fmt.<span className="code-yellow">Printf</span>(<span className="code-green">&quot;Готово: %t\n&quot;</span>, week.Built)</code></div>
                  <div className="code-line"><span className="line-no">13</span><code>{'}'}</code></div>
                </div>
                <div className="terminal-output"><span className="output-prompt">➜</span><span>go run .</span><span className="output-result">Готово: true</span></div>
              </div>
              <div className="terminal-note"><span className="note-icon">↗</span><span>Маленькая программа. Настоящее понимание.</span></div>
              <div className="terminal-orbit orbit-a" aria-hidden="true">{`{ }`}</div>
              <div className="terminal-orbit orbit-b" aria-hidden="true">:=</div>
            </div>
          </div>
          <div className="hero-bottom-line" aria-hidden="true" />
        </section>

        <section className="outcomes-section site-container py-20 sm:py-24">
          <div className="section-heading grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="eyebrow eyebrow-ink">Зачем этот маршрут</p>
              <h2 className="section-title mt-4">Знание становится<br className="hidden sm:block" /> навыком в коде.</h2>
            </div>
            <p className="section-lead max-w-2xl md:justify-self-end">
              К концу маршрута у вас будет учебный проект на Go: небольшой JSON API событий с фильтром по дате и замером скорости ответа. По пути вы также напишете консольные программы и проверите отдельные функции тестами.
            </p>
          </div>
          <div className="outcome-grid mt-11 grid gap-4 md:grid-cols-3">
            <article className="outcome-card outcome-card-mint">
              <span className="outcome-index">01 / КОНСОЛЬ</span>
              <div className="outcome-symbol symbol-brackets" aria-hidden="true">{'{ }'}</div>
              <h3>Написать свои программы</h3>
              <p>Собрать небольшие консольные задачи с переменными, условиями, циклами и функциями.</p>
            </article>
            <article className="outcome-card outcome-card-blue">
              <span className="outcome-index">02 / ПРОВЕРИТЬ</span>
              <div className="outcome-symbol symbol-terminal" aria-hidden="true">&gt;_</div>
              <h3>Проверить поведение</h3>
              <p>Обработать ошибки, написать тесты и сравнить результаты на заданных примерах.</p>
            </article>
            <article className="outcome-card outcome-card-warm">
              <span className="outcome-index">03 / ПРОЕКТ</span>
              <div className="outcome-symbol symbol-star" aria-hidden="true">✳</div>
              <h3>Собрать учебный JSON API</h3>
              <p>Выдать список событий по HTTP, добавить фильтр по дате и измерить задержку на учебном наборе данных.</p>
            </article>
          </div>
        </section>

        <section id="pathway" className="pathway-section py-20 sm:py-24">
          <div className="site-container">
            <div className="section-heading grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="eyebrow eyebrow-ink">Маршрут из {lessons.length} уроков</p>
                <h2 className="section-title mt-4">От первых строк<br className="hidden sm:block" /> до своего сервиса.</h2>
              </div>
              <div className="md:justify-self-end md:max-w-xl">
                <p className="section-lead">Пять последовательных этапов дают опору и пространство для роста. Уроки можно проходить в удобном ритме.</p>
                <Link href="/tutorials" className="text-link mt-4 inline-flex items-center gap-2">Все уроки <ArrowIcon diagonal /></Link>
              </div>
            </div>

            <div className="pathway-list mt-12">
              {curriculumStages.map((stage, stageIndex) => {
                const stageLessons = lessons.filter((lesson) => lesson.stageId === stage.id);
                if (stageLessons.length === 0) return null;
                return (
                  <div className="pathway-stage" key={stage.id}>
                    <div className="stage-heading">
                      <span className="stage-count" style={{ "--stage-accent": stage.accent } as CSSProperties}>{String(stageIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="stage-eyebrow">{stage.eyebrow}</p>
                        <h3>{stage.title}</h3>
                      </div>
                    </div>
                    <div className="stage-lessons">
                      {stageLessons.map((lesson) => {
                        const number = lessons.findIndex((item) => item.slug === lesson.slug) + 1;
                        return (
                          <Link href={`/tutorials/${lesson.slug}`} className="lesson-row" key={lesson.slug}>
                            <span className="lesson-number">{String(number).padStart(2, "0")}</span>
                            <span className="lesson-detail"><span className="lesson-title">{lesson.title}</span><span className="lesson-description">{lesson.description}</span></span>
                            <span className="lesson-duration">{lesson.duration}</span>
                            <span className="lesson-arrow"><ArrowIcon /></span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pathway-footer mt-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div><p className="text-base font-semibold">Следующий шаг — ваш.</p><p className="mt-1 text-sm pathway-footer-copy">Выберите урок и напишите первую строку кода сегодня.</p></div>
              <Link href="/tutorials" className="button-dark">К списку уроков <ArrowIcon /></Link>
            </div>
          </div>
        </section>

        <section className="process-section site-container grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-ink">Как устроено обучение</p>
            <h2 className="section-title mt-4">Короткая теория.<br />Своя практика.</h2>
            <p className="section-lead mt-5 max-w-xl">Не нужно запоминать всё сразу. Сосредоточьтесь на одной идее, проверьте её руками и двигайтесь дальше, когда будете готовы.</p>
            <div className="process-steps mt-8">
              <div className="process-step"><span>1</span><div><h3>Разберитесь в идее</h3><p>Короткое объяснение показывает цель и знакомит с инструментом.</p></div></div>
              <div className="process-step"><span>2</span><div><h3>Соберите своё решение</h3><p>Упражнение предлагает применить тему на знакомой задаче.</p></div></div>
              <div className="process-step"><span>3</span><div><h3>Проверьте результат</h3><p>Понятные критерии помогают увидеть, что уже работает.</p></div></div>
            </div>
          </div>
          <div className="practice-panel">
            <div className="practice-panel-top"><span>ПРОГРЕСС ПРАКТИКИ</span><span className="practice-live"><i /> ПЛАН</span></div>
            <div className="practice-stat"><span>Сначала — основы.</span><strong>01 <small>/ {lessons.length}</small></strong></div>
            <div className="practice-track"><span /></div>
            <div className="practice-steps">
              <div className="practice-step is-current"><span className="step-check">01</span><div><strong>Переменные и вывод</strong><small>Вы уже здесь</small></div><span className="step-state">СТАРТ</span></div>
              <div className="practice-step"><span className="step-check">02</span><div><strong>Условия и циклы</strong><small>Логика программы</small></div></div>
              <div className="practice-step"><span className="step-check">03</span><div><strong>Функции и результаты</strong><small>Переиспользуемые шаги</small></div></div>
            </div>
            <p className="practice-footnote">Ваш темп — правильный темп.</p>
          </div>
        </section>

        <section className="cta-section site-container pb-20 sm:pb-24">
          <div className="cta-panel relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-14 lg:px-16">
            <div className="cta-shape" aria-hidden="true">go</div>
            <div className="relative max-w-2xl">
              <p className="eyebrow eyebrow-mint">Время написать первую программу</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Лучший способ выучить Go — начать писать на Go.</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">Откройте первый урок, настройтесь на практику и двигайтесь шаг за шагом.</p>
              <Link href="/tutorials" className="button-primary mt-7">Перейти к урокам <ArrowIcon /></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

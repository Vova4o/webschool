import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTutorialBySlug,
  checkUserAccess,
  getNextTutorialInCategory,
} from "@/lib/db";
import type { Tutorial } from "@/lib/db";
import { auth } from "@/auth";
import { Metadata } from "next";
import MarkdownContent from "@/components/MarkdownContent";
import {
  curriculumLessons,
  curriculumStages,
  getCurriculumLesson,
  getLessonNumber,
} from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const curriculumLesson = getCurriculumLesson(slug);
  if (curriculumLesson) {
    return {
      title: `${curriculumLesson.title} | Go | WebSchool`,
      description: curriculumLesson.description,
      openGraph: {
        title: curriculumLesson.title,
        description: curriculumLesson.description,
        type: "article",
      },
    };
  }

  try {
    const tutorial = await getTutorialBySlug(slug);

    if (!tutorial) {
      return {
        title: "Tutorial Not Found",
      };
    }

    return {
      title: `${tutorial.title} | WebSchool`,
      description: tutorial.description,
      openGraph: {
        title: tutorial.title,
        description: tutorial.description,
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Tutorial | WebSchool",
    };
  }
}

function CurriculumLessonPage({ slug }: { slug: string }) {
  const lesson = getCurriculumLesson(slug);
  if (!lesson) {
    notFound();
  }

  const index = getLessonNumber(slug);
  const previous = index && index > 1 ? curriculumLessons[index - 2] : undefined;
  const next = index ? curriculumLessons[index] : undefined;
  const stage = curriculumStages.find((item) => item.id === lesson.stageId);

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <header className="relative overflow-hidden bg-[#0b1727] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <Link href="/tutorials" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">← Все этапы</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200">
            <span>{stage?.eyebrow ?? "ПРАКТИЧЕСКИЙ УРОК"}</span>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span>Урок {String(index).padStart(2, "0")} из {curriculumLessons.length}</span>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-slate-200">{lesson.duration}</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{lesson.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{lesson.description}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
        <div className="min-w-0 space-y-7">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9" aria-label="Теория урока">
            <MarkdownContent content={lesson.content} />
          </section>
          <section className="rounded-3xl border border-amber-200 bg-[#fffaf0] p-6 sm:p-8" aria-labelledby="exercise-heading">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Практика</p>
            <h2 id="exercise-heading" className="mt-2 text-2xl font-semibold tracking-tight">Попробуйте сами</h2>
            <MarkdownContent content={lesson.exercise} />
          </section>
          <section className="rounded-3xl border border-emerald-200 bg-[#effaf5] p-6 sm:p-8" aria-labelledby="check-heading">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Проверка результата</p>
            <h2 id="check-heading" className="mt-2 text-2xl font-semibold tracking-tight">Как понять, что получилось</h2>
            <MarkdownContent content={lesson.check} />
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="outcomes-heading">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Результат урока</p>
            <h2 id="outcomes-heading" className="mt-2 text-xl font-semibold">Вы научитесь</h2>
            <ul className="mt-5 space-y-3">
              {lesson.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-6 text-slate-700"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">✓</span>{outcome}</li>)}
            </ul>
          </section>
          <section className="rounded-3xl border border-cyan-200 bg-[#f0fbff] p-6 shadow-sm" aria-labelledby="run-command-heading">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">Практический шаг</p>
            <h2 id="run-command-heading" className="mt-2 text-xl font-semibold">Запуск программы</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Выполните команду в терминале из каталога упражнения.</p>
            <pre tabIndex={0} aria-label={`Команда запуска: ${lesson.command}`} className="mt-4 overflow-x-auto rounded-xl bg-[#101c2a] p-4 text-sm text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"><code>{lesson.command}</code></pre>
          </section>
          <div className="rounded-3xl bg-[#0b1727] p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Учебный ритм</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">Сначала прочитайте объяснение, затем напишите решение самостоятельно и сверяйтесь с критериями проверки.</p>
            <p className="mt-4 text-xs font-medium text-slate-400">Ориентир по времени: {lesson.duration}</p>
          </div>
        </aside>
      </div>

      <nav aria-label="Навигация по урокам" className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
          {previous ? <Link href={`/tutorials/${previous.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">← Предыдущий урок</span><span className="mt-2 block font-semibold">{previous.title}</span></Link> : <span />}
          {next ? <Link href={`/tutorials/${next.slug}`} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left transition hover:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:text-right"><span className="block text-xs font-semibold uppercase tracking-wider text-emerald-800">Следующий урок →</span><span className="mt-2 block font-semibold text-slate-900">{next.title}</span></Link> : <Link href="/tutorials" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-900 sm:text-right">Вы завершили маршрут · вернуться к этапам →</Link>}
        </div>
      </nav>
    </main>
  );
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curriculumLesson = getCurriculumLesson(slug);
  if (curriculumLesson) {
    return <CurriculumLessonPage slug={slug} />;
  }

  let tutorial: Tutorial | null = null;
  let nextTutorial: Tutorial | null = null;

  try {
    tutorial = await getTutorialBySlug(slug);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
  }

  if (!tutorial) {
    notFound();
  }

  try {
    nextTutorial = await getNextTutorialInCategory(
      tutorial.category,
      tutorial.order || 0
    );
  } catch (error) {
    console.error("Error fetching next tutorial:", error);
  }

  // Check if user has access to this tutorial
  const session = await auth();
  let hasAccess = true;
  let accessMessage = "";

  if (!tutorial.is_free) {
    if (!session?.user) {
      hasAccess = false;
      accessMessage = "Войдите, чтобы получить доступ к этому премиум-уроку";
    } else {
      const userId = parseInt(session.user.id);
      hasAccess = await checkUserAccess(userId, tutorial.id);

      if (!hasAccess) {
        if (!session.user.isPremium) {
          accessMessage = "Этот урок доступен только для Premium подписчиков";
        } else {
          accessMessage = "Ваша Premium подписка истекла";
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Tutorial Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/tutorials"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
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

          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {tutorial.title}
            </h1>
            {!tutorial.is_free && (
              <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Premium
              </span>
            )}
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {tutorial.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {tutorial.level}
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {tutorial.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasAccess ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-yellow-500 dark:text-yellow-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Премиум-контент
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {accessMessage}
            </p>
            {!session?.user ? (
              <div className="flex justify-center gap-4">
                <Link
                  href="/auth/login"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/register"
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Создать аккаунт
                </Link>
              </div>
            ) : (
              <Link
                href="/pricing"
                className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Получить Premium доступ
              </Link>
            )}
          </div>
        ) : (
          <MarkdownContent content={tutorial.content} />
        )}
      </div>

      {/* Navigation */}
      {hasAccess && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <Link
              href="/tutorials"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              Все уроки
            </Link>
            {nextTutorial && (
              <Link
                href={`/tutorials/${nextTutorial.slug}`}
                className="inline-flex items-center px-4 py-2 border border-blue-600 dark:border-blue-500 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60"
              >
                Следующий урок
                <svg
                  className="w-4 h-4 ml-2"
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

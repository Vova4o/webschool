import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorialBySlug, checkUserAccess } from "@/lib/db";
import { auth } from "@/auth";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

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

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let tutorial;

  try {
    tutorial = await getTutorialBySlug(slug);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
  }

  if (!tutorial) {
    notFound();
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
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: tutorial.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>
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
          </div>
        </div>
      )}
    </div>
  );
}

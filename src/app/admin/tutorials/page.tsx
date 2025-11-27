"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Tutorial {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  order: number;
}

export default function AdminTutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [initLoading, setInitLoading] = useState(false);
  const [initMessage, setInitMessage] = useState("");

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await fetch("/api/tutorials");
      if (!response.ok) throw new Error("Failed to fetch tutorials");
      const data = await response.json();
      setTutorials(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      // Don't treat database not initialized as a fatal error
      setError(err instanceof Error ? err.message : "Failed to load tutorials");
      setTutorials([]); // Set empty array so UI still renders
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот урок?")) return;

    try {
      const response = await fetch(`/api/tutorials/id/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete tutorial");

      setTutorials(tutorials.filter((t) => t.id !== id));
    } catch {
      alert("Ошибка при удалении урока");
    }
  };

  const handleInitDatabase = async () => {
    if (
      !confirm(
        "Инициализировать базу данных? Это создаст таблицы и добавит начальные уроки."
      )
    )
      return;

    setInitLoading(true);
    setInitMessage("");

    try {
      const response = await fetch("/api/admin/init-db", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize database");
      }

      setInitMessage(data.message);
      // Refresh tutorials list
      fetchTutorials();
    } catch (err) {
      setInitMessage(
        "Ошибка: " + (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setInitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Управление уроками
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleInitDatabase}
              disabled={initLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initLoading ? "Инициализация..." : "🗄️ Инициализировать БД"}
            </button>
            <Link
              href="/admin/tutorials/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
            >
              + Добавить урок
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold">База данных не инициализирована</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-1">
                  Нажмите кнопку &quot;Инициализировать БД&quot; выше для
                  создания таблиц.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Init Message */}
        {initMessage && (
          <div
            className={`mb-6 p-4 rounded-md ${
              initMessage.includes("Ошибка")
                ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400"
                : "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400"
            }`}
          >
            {initMessage}
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Уровень
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Длительность
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tutorials.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="text-4xl mb-2">📚</div>
                    <p>
                      Нет уроков. Инициализируйте базу данных или добавьте новый
                      урок.
                    </p>
                  </td>
                </tr>
              ) : (
                tutorials.map((tutorial) => (
                  <tr key={tutorial.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {tutorial.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {tutorial.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {tutorial.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {tutorial.duration}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link
                        href={`/admin/tutorials/${tutorial.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(tutorial.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {tutorials.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-gray-500 dark:text-gray-400">
                Нет уроков. Инициализируйте базу данных или добавьте новый урок.
              </p>
            </div>
          ) : (
            tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {tutorial.slug}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Категория:
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {tutorial.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Длительность:
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {tutorial.duration}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {tutorial.level}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/tutorials/${tutorial.id}/edit`}
                    className="flex-1 px-3 py-2 text-center text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Редактировать
                  </Link>
                  <button
                    onClick={() => handleDelete(tutorial.id)}
                    className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

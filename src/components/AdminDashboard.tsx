"use client";

import { useState, useEffect } from "react";

type Tab = "tutorials" | "examples" | "database";

interface Tutorial {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  content: string;
  category: string;
  order: number;
  is_free: boolean;
}

interface Example {
  id: number;
  slug: string;
  title: string;
  description: string;
  code: string;
  explanation: string | null;
  category: string;
  order: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("tutorials");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [editingExample, setEditingExample] = useState<Example | null>(null);
  const [showTutorialForm, setShowTutorialForm] = useState(false);
  const [showExampleForm, setShowExampleForm] = useState(false);
  const [showAdminInfo, setShowAdminInfo] = useState(true);

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === "tutorials") {
      fetchTutorials();
    } else if (activeTab === "examples") {
      fetchExamples();
    }
  }, [activeTab]);

  const fetchTutorials = async () => {
    try {
      const res = await fetch("/api/tutorials");
      if (res.ok) {
        const data = await res.json();
        setTutorials(data.tutorials || []);
      }
    } catch (err) {
      console.error("Failed to fetch tutorials:", err);
    }
  };

  const fetchExamples = async () => {
    try {
      const res = await fetch("/api/examples");
      if (res.ok) {
        const data = await res.json();
        setExamples(data.examples || []);
      }
    } catch (err) {
      console.error("Failed to fetch examples:", err);
    }
  };

  const handleInitDatabase = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/init-db", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Database initialized successfully!");
        // Refresh data
        if (activeTab === "tutorials") fetchTutorials();
        if (activeTab === "examples") fetchExamples();
      } else {
        setError(data.error || "Failed to initialize database");
      }
    } catch (_err) {
      setError("Failed to initialize database");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTutorial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const tutorialData = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      level: formData.get("level") as string,
      duration: formData.get("duration") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      order: parseInt(formData.get("order") as string) || 0,
      is_free: formData.get("is_free") === "on",
    };

    try {
      const url = editingTutorial
        ? `/api/tutorials/id/${editingTutorial.id}`
        : "/api/tutorials";
      const method = editingTutorial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorialData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          editingTutorial
            ? "Tutorial updated successfully!"
            : "Tutorial created successfully!"
        );
        setEditingTutorial(null);
        setShowTutorialForm(false);
        fetchTutorials();
      } else {
        setError(data.error || "Failed to save tutorial");
      }
    } catch (_err) {
      setError("Failed to save tutorial");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTutorial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tutorial?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/tutorials/id/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Tutorial deleted successfully!");
        fetchTutorials();
      } else {
        setError("Failed to delete tutorial");
      }
    } catch (_err) {
      setError("Failed to delete tutorial");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExample = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const exampleData = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      code: formData.get("code") as string,
      explanation: (formData.get("explanation") as string) || null,
      category: formData.get("category") as string,
      order: parseInt(formData.get("order") as string) || 0,
    };

    try {
      const url = editingExample
        ? `/api/examples/id/${editingExample.id}`
        : "/api/examples";
      const method = editingExample ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exampleData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          editingExample
            ? "Example updated successfully!"
            : "Example created successfully!"
        );
        setEditingExample(null);
        setShowExampleForm(false);
        fetchExamples();
      } else {
        setError(data.error || "Failed to save example");
      }
    } catch (_err) {
      setError("Failed to save example");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExample = async (id: number) => {
    if (!confirm("Are you sure you want to delete this example?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/examples/id/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Example deleted successfully!");
        fetchExamples();
      } else {
        setError("Failed to delete example");
      }
    } catch (_err) {
      setError("Failed to delete example");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tutorials, examples, and database
          </p>
        </div>

        {/* Admin Credentials Info Banner */}
        {showAdminInfo && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  📝 Default Admin Credentials
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                  <strong>Email:</strong> admin@webschool.com
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Password:</strong> admin123
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  💡 After first login, create a new admin user and delete the
                  default one for security.
                </p>
              </div>
              <button
                onClick={() => setShowAdminInfo(false)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-xl leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("tutorials")}
              className={`${
                activeTab === "tutorials"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab("examples")}
              className={`${
                activeTab === "examples"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Examples
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`${
                activeTab === "database"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Database
            </button>
          </nav>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200">{success}</p>
          </div>
        )}

        {/* Tutorials Tab */}
        {activeTab === "tutorials" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tutorials
              </h2>
              <button
                onClick={() => {
                  setEditingTutorial(null);
                  setShowTutorialForm(!showTutorialForm);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {showTutorialForm ? "Cancel" : "Add Tutorial"}
              </button>
            </div>

            {/* Tutorial Form */}
            {showTutorialForm && (
              <form
                onSubmit={handleSaveTutorial}
                className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {editingTutorial ? "Edit Tutorial" : "Add New Tutorial"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="slug"
                    placeholder="Slug (e.g., hello-world)"
                    defaultValue={editingTutorial?.slug}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={editingTutorial?.title}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    name="category"
                    defaultValue={editingTutorial?.category || "basics"}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="basics">Basics (Основы Go)</option>
                    <option value="advanced">
                      Advanced (Продвинутые темы)
                    </option>
                  </select>
                  <select
                    name="level"
                    defaultValue={editingTutorial?.level || "beginner"}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 10 min)"
                    defaultValue={editingTutorial?.duration}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    name="order"
                    placeholder="Order"
                    defaultValue={editingTutorial?.order}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    defaultValue={editingTutorial?.description}
                    required
                    rows={3}
                    className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    name="content"
                    placeholder="Content (Markdown)"
                    defaultValue={editingTutorial?.content}
                    required
                    rows={10}
                    className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <label className="flex items-center space-x-2 col-span-2">
                    <input
                      type="checkbox"
                      name="is_free"
                      defaultChecked={editingTutorial?.is_free}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900 dark:text-white">
                      Free Tutorial
                    </span>
                  </label>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Tutorial"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTutorial(null);
                      setShowTutorialForm(false);
                    }}
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Tutorials List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tutorials.map((tutorial) => (
                    <tr key={tutorial.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {tutorial.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.is_free ? "Free" : "Premium"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setEditingTutorial(tutorial);
                            setShowTutorialForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTutorial(tutorial.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tutorials.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No tutorials found. Add your first tutorial above!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === "examples" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Examples
              </h2>
              <button
                onClick={() => {
                  setEditingExample(null);
                  setShowExampleForm(!showExampleForm);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {showExampleForm ? "Cancel" : "Add Example"}
              </button>
            </div>

            {/* Example Form */}
            {showExampleForm && (
              <form
                onSubmit={handleSaveExample}
                className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {editingExample ? "Edit Example" : "Add New Example"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="slug"
                    placeholder="Slug (e.g., hello-world)"
                    defaultValue={editingExample?.slug}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={editingExample?.title}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    defaultValue={editingExample?.category}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    name="order"
                    placeholder="Order"
                    defaultValue={editingExample?.order}
                    required
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    defaultValue={editingExample?.description}
                    required
                    rows={3}
                    className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    name="code"
                    placeholder="Code"
                    defaultValue={editingExample?.code}
                    required
                    rows={10}
                    className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <textarea
                    name="explanation"
                    placeholder="Explanation (optional, Markdown)"
                    defaultValue={editingExample?.explanation || ""}
                    rows={5}
                    className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Example"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingExample(null);
                      setShowExampleForm(false);
                    }}
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Examples List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {examples.map((example) => (
                    <tr key={example.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {example.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {example.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {example.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setEditingExample(example);
                            setShowExampleForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExample(example.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {examples.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No examples found. Add your first example above!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Database Tab */}
        {activeTab === "database" && (
          <div>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Database Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Initialize or reset your database tables and seed data.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Initialize Database
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  This will create all necessary tables and seed initial data.
                  Existing data will not be affected.
                </p>
                <button
                  onClick={handleInitDatabase}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? "Initializing..." : "Initialize Database"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

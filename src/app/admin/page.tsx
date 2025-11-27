"use client";

import AdminDashboard from "@/components/AdminDashboard";

// Middleware handles authentication, so this page is only accessible to admins
export default function AdminPage() {
  return <AdminDashboard />;
}

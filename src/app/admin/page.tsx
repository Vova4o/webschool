import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

// Middleware handles authentication, so this page is only accessible to admins
export default function AdminPage() {
  return <AdminDashboard />;
}

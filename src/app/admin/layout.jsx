import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";

// In a real app, you'd have a server-side function to verify authentication
// For example, by reading an httpOnly cookie.
const checkAuth = async () => {
  // --- PLACEHOLDER ---
  // const token = cookies().get('auth_token');
  // if (!token || !verifyJwt(token.value)) redirect('/admin/login');
  return true; // Assume user is logged in for this example
};

export default async function AdminLayout({ children }) {
  await checkAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white/40 dark:bg-white/10 backdrop-blur-lg p-8 rounded-r-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-primary hover:text-primary-foreground"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-primary hover:text-primary-foreground"
          >
            <Settings size={20} />
            <span>Messages</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-primary hover:text-primary-foreground"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          {/* A real logout would be a form that POSTs to an API route to clear the cookie */}
          <Link
            href="#"
            className="flex items-center gap-2 p-2 mt-auto rounded-md hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-grow ">{children}</main>
    </div>
  );
}

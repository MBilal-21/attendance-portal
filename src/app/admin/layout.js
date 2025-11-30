// app/admin/layout.jsx
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r p-4">
        <div className="mb-8">
          <Image src="/logo2.svg" alt="Smart School" width={140} height={40} />
        </div>

        <nav className="flex-1 space-y-2 text-sm font-medium text-gray-700">
          <Link href="/admin" className="flex items-center gap-3 bg-blue-100 text-blue-700 p-3 rounded-lg">
            🏠 Dashboard
          </Link>
          <Link href="/admin/attendance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            📅 Attendance
          </Link>
          <Link href="/admin/students" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            🎓 Students
          </Link>
          <Link href="/admin/teachers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            👩‍🏫 Teachers
          </Link>
          <Link href="/admin/programs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            📚 Programs
          </Link>
          <Link href="/admin/classes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            🏫 Classes
          </Link>
          <Link href="/admin/subjects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            📘 Subjects
          </Link>
          <Link href="/admin/assign" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            🔁 Assign Teacher
          </Link>
          <div className="mt-4 pt-4  text-gray-500 text-sm">🌙 Dark Mode (Coming Soon)</div>
          <LogoutButton /> {/* client component sends POST to /api/auth/logout and redirects */}
        </nav>


      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}

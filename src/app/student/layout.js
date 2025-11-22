export default function StudentLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-green-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Student Portal</h2>

        <nav className="flex flex-col space-y-2">
          <a href="/student" className="hover:bg-green-700 p-2 rounded">Dashboard</a>
          <a href="/student/attendance" className="hover:bg-green-700 p-2 rounded">My Attendance</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

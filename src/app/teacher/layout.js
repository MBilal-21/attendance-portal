export default function TeacherLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-blue-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Teacher Portal</h2>

        <nav className="flex flex-col space-y-2">
          <a href="/teacher" className="hover:bg-blue-700 p-2 rounded">Dashboard</a>
          <a href="/teacher/attendance" className="hover:bg-blue-700 p-2 rounded">Mark Attendance</a>
          <a href="/teacher/history" className="hover:bg-blue-700 p-2 rounded">Attendance History</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

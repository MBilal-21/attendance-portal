"use client";

import {
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import { useState } from "react";

export default function TeacherDashboard() {
  // Dummy stats
  const [stats] = useState({
    classes: 3,
    students: 120,
    subjects: 5,
    attendance_today: 95,
  });

  return (
    <div className="space-y-6 text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your classes and students</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="My Classes" value={stats.classes} icon={FiUsers} bg="bg-blue-100" text="text-blue-700" />
        <StatCard label="Total Students" value={stats.students} icon={FiUsers} bg="bg-green-100" text="text-green-700" />
        <StatCard label="Subjects" value={stats.subjects} icon={FiBookOpen} bg="bg-purple-100" text="text-purple-700" />
        <StatCard label="Attendance Today" value={stats.attendance_today} icon={FiCheckCircle} bg="bg-yellow-100" text="text-yellow-700" />
      </div>

      {/* Placeholder Section */}
      <div className="bg-white rounded-xl shadow border p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Upcoming Features</h2>
        <p className="text-gray-500">
          Teacher portal features are coming soon! Stay tuned for class management, attendance tracking, and more.
        </p>
      </div>
    </div>
  );
}

/* ---------- Small Component ---------- */
function StatCard({ label, value, icon: Icon, bg, text }) {
  return (
    <div className={`${bg} rounded-xl p-6 shadow border text-center`}>
      <Icon className={`${text} mx-auto mb-2`} size={28} />
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-3xl font-bold ${text}`}>{value}</p>
    </div>
  );
}

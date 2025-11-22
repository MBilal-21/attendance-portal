
// ----------------------------------------------------
// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    present: 0,
    pendingFees: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome Back, Aleena Malik</h1>
          <p className="text-sm text-gray-500">Let’s dive in and get things done.</p>
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
          ⬇ Export report
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-2xl font-bold mt-2">{stats.students}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Total Teachers</h2>
          <p className="text-2xl font-bold mt-2">{stats.teachers}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Total Classes</h2>
          <p className="text-2xl font-bold mt-2">{stats.classes}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Total Subjects</h2>
          <p className="text-2xl font-bold mt-2">{stats.subjects}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Illustration */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center">
          <Image
            src="/logo2.svg"
            alt="Attendance Stats"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        {/* Accounts Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Accounts</h2>
          <div className="h-48 flex items-end justify-between gap-4">
            <div className="w-6 bg-purple-500 h-20 rounded"></div>
            <div className="w-6 bg-purple-500 h-32 rounded"></div>
            <div className="w-6 bg-purple-500 h-24 rounded"></div>
            <div className="w-6 bg-purple-500 h-40 rounded"></div>
            <div className="w-6 bg-purple-500 h-16 rounded"></div>
            <div className="w-6 bg-purple-500 h-28 rounded"></div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Upcoming Events</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-2">Quaid-e-Azam Day</td>
                <td className="p-2 text-purple-600">Upcoming</td>
                <td className="p-2">2024-05-18</td>
                <td className="p-2">✏</td>
              </tr>

              <tr className="border-b">
                <td className="p-2">23rd March Holiday</td>
                <td className="p-2 text-green-600">Done</td>
                <td className="p-2">2024-05-19</td>
                <td className="p-2">✏</td>
              </tr>

              <tr>
                <td className="p-2">Pakistan Day</td>
                <td className="p-2 text-red-500">Missed</td>
                <td className="p-2">2024-05-20</td>
                <td className="p-2">✏</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

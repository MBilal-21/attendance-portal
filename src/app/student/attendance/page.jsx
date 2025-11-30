"use client";

import { useEffect, useState } from "react";

export default function StudentAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    async function loadAttendance() {
      try {
        const res = await fetch("/api/student/attendance");
        const data = await res.json();

        if (!data.error) {
          setStudent({
            id: data.student_id,
            user_id: data.user_id,
            name: data.student_name,
          });
          setAttendance(data.attendance);
          setFiltered(data.attendance);
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }

    loadAttendance();
  }, []);

  // Apply date filter
  useEffect(() => {
    if (!dateFilter) setFiltered(attendance);
    else setFiltered(attendance.filter((a) => a.date === dateFilter));
  }, [dateFilter, attendance]);

  if (loading)
    return <div className="p-4 text-gray-600">Loading attendance...</div>;

  // Summary
  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const absentCount = attendance.filter((a) => a.status === "Absent").length;
  const leaveCount = attendance.filter((a) => a.status === "Leave").length;

  return (
    <div className="space-y-6 text-gray-800">
      <h1 className="text-2xl font-bold">
        Attendance Summary {student ? `- ${student.name}` : ""}
      </h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-500 text-sm">Present</div>
          <div className="text-3xl font-bold text-green-700">{presentCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-500 text-sm">Absent</div>
          <div className="text-3xl font-bold text-red-600">{absentCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-500 text-sm">Leave</div>
          <div className="text-3xl font-bold text-yellow-600">{leaveCount}</div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-3">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setDateFilter("")}
        >
          Clear
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={2}>
                  No attendance found
                </td>
              </tr>
            ) : (
              filtered.map((a, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{a.date}</td>
                  <td
                    className={`p-2 font-medium ${
                      a.status === "Present"
                        ? "text-green-600"
                        : a.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {a.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

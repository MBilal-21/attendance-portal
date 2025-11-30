"use client";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/student/dashboard");
        const data = await res.json();
        if (!data.error) {
          setProfile(data);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-4 text-red-600">Unable to load dashboard.</div>;
  }

  const { user, student, class: classInfo, attendance_summary, latest_attendance } = profile;

  return (
    <div className="space-y-8 text-gray-800">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user.name}</p>

      {/* PROFILE BOX */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <div className="flex justify-between"> */}
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-bold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-bold">{user.email}</p>
          </div>
        
                
          <div>
            <p className="text-sm text-gray-500">Roll No</p>
            <p className="font-bold">{student.roll_no}</p>
          </div>
  
          <div>
            <p className="text-sm text-gray-500">Program</p>
            <p className="font-bold">{classInfo.program_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Semester</p>
            <p className="font-bold">{classInfo.semester}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Section</p>
            <p className="font-bold">{classInfo.section}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Batch</p>
            <p className="font-bold">{classInfo.start_year}</p>
          </div>
           
        </div>
      </div>

      {/* ATTENDANCE SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-100 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Present</p>
          <p className="text-3xl font-bold text-green-700">{attendance_summary.present}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Absent</p>
          <p className="text-3xl font-bold text-red-600">{attendance_summary.absent}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Leave / Late</p>
          <p className="text-3xl font-bold text-yellow-600">{attendance_summary.leave_days}</p>
        </div>
      </div>

      {/* LAST ATTENDANCE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {latest_attendance.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center p-4 text-gray-500">
                    No attendance recorded.
                  </td>
                </tr>
              ) : (
                latest_attendance.map((a, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{a.date}</td>
                    <td
                      className={`p-2 font-bold ${
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

    </div>
  );
}

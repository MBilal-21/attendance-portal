"use client";

import { useState, useEffect } from "react";

export default function AttendancePage() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  // --------------------------
  // Set today's date on load
  // --------------------------
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // --------------------------
  // Load all classes on page load
  // --------------------------
  useEffect(() => {
    async function loadClasses() {
      const res = await fetch("/api/admin/attendance/classes");
      const data = await res.json();
      setClasses(data);
    }
    loadClasses();
  }, []);

  // --------------------------
  // Load students of selected class
  // --------------------------
  async function loadStudents(class_id, selectedDate) {
    if (!class_id || !selectedDate) return;

    const res = await fetch(`/api/admin/attendance/students?class_id=${class_id}`);
    const studentsList = await res.json();
    setStudents(studentsList);

    // Try to fetch attendance for this class + date
    const attRes = await fetch(
      `/api/admin/attendance/get?class_id=${class_id}&date=${selectedDate}`
    );
    const saved = await attRes.json();

    const savedMap = {};
    saved.forEach((row) => {
      savedMap[row.student_id] = row.status;
    });

    // Build initial attendance map
    const initial = {};
    studentsList.forEach((s) => {
      initial[s.id] = savedMap[s.id] || "Absent"; // default Absent if not saved
    });

    setAttendance(initial);
  }

  // --------------------------
  // Trigger when class or date changes
  // --------------------------
  useEffect(() => {
    if (selectedClass && date) {
      loadStudents(selectedClass, date);
    }
  }, [selectedClass, date]);

  // --------------------------
  // Save Attendance
  // --------------------------
  async function saveAttendance() {
    const body = {
      class_id: Number(selectedClass),
      subject_id: 1, // admin's default subject
      date,
      records: Object.keys(attendance).map((id) => ({
        student_id: Number(id),
        status: attendance[id],
      })),
    };

    const res = await fetch("/api/admin/attendance/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const msg = await res.json();
    alert(msg.message || msg.error);
  }

  return (
    <div className="space-y-6 text-slate-900 p-6">
      <h1 className="text-2xl font-bold">Attendance</h1>

      {/* Class & Date */}
      <div className="flex gap-4">
        <select
          className="border p-2 rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.class_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Roll No</th>
            <th className="p-2">Student</th>
            <th className="p-2">Present</th>
            <th className="p-2">Absent</th>
            <th className="p-2">Leave</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border">
              <td className="p-2">{s.roll_no}</td>
              <td className="p-2">{s.student_name}</td>

              {["Present", "Absent", "Leave"].map((status) => (
                <td className="p-2 text-center" key={status}>
                  <input
                    type="radio"
                    name={`student-${s.id}`}
                    checked={attendance[s.id] === status}
                    onChange={() =>
                      setAttendance({ ...attendance, [s.id]: status })
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
        onClick={saveAttendance}
      >
        Save Attendance
      </button>
    </div>
  );
}

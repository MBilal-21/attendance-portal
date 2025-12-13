"use client";

import { useEffect, useState } from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("/api/admin/users/list");
      const data = await res.json();
      setStudents(data.filter((u) => u.role === "student"));
    }
    fetchStudents();
  }, []);

  async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    const res = await fetch("/api/admin/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setStudents(students.filter((s) => s.id !== id));
    }
  }

  return (
    <div className="p-8">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <p className="text-gray-500 text-sm mt-1">
          Dashboard {" >> "} Students List
        </p>
      </div>

      {/* TOP BAR ACTION BUTTON */}
      <div className="flex justify-end mb-4">
        <a
          href="/admin/students/add"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
        >
          Add Student
        </a>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 border">

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Class</th>
                <th className="p-3">Roll No</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="p-3">{s.id}</td>
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3 text-gray-600">{s.email}</td>
                  <td className="p-3">{s.class_id ?? "—"}</td>
                  <td className="p-3">{s.roll_no ?? "—"}</td>

                  {/* ACTION BUTTONS */}
                  <td className="p-3 flex justify-center gap-3">
                    <a
                      href={`/admin/students/edit/${s.id}`}
                      className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                    >
                      <FiEdit3 size={16} />
                      Edit
                    </a>

                    <button
                      onClick={() => deleteUser(s.id)}
                      className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

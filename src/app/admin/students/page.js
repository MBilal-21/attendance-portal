"use client";

import { useEffect, useState } from "react";
import { FiTrash2, FiEdit3, FiSearch, FiUsers } from "react-icons/fi";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  }

  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.email} ${s.roll_no ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FiUsers /> Students
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Dashboard {" > "} Students List
          </p>
        </div>

        <a
          href="/admin/users/add"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          + Add Student
        </a>
      </div>

      {/* SEARCH BAR (CENTERED) */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or roll no"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow border">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="p-3">{s.id}</td>
                    <td className="p-3 font-medium">{s.name}</td>
                    <td className="p-3 text-gray-600">{s.email}</td>
                    <td className="p-3">{s.class_id ?? "—"}</td>
                    <td className="p-3">{s.roll_no ?? "—"}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <a
                        href={`/admin/students/edit/${s.id}`}
                        className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
                      >
                        <FiEdit3 size={14} />
                        Edit
                      </a>

                      <button
                        onClick={() => deleteUser(s.id)}
                        className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
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

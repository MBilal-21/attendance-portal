"use client";

import { useEffect, useState } from "react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchTeachers() {
      const res = await fetch("/api/admin/users/list");
      const data = await res.json();
      setTeachers(data.filter((u) => u.role === "teacher"));
    }
    fetchTeachers();
  }, []);

  async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    const res = await fetch("/api/admin/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Teachers List</h1>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id} className="border">
              <td className="p-2 border">{t.id}</td>
              <td className="p-2 border">{t.name}</td>
              <td className="p-2 border">{t.email}</td>
              <td className="p-2 border flex gap-2">
                <a
                  href={`/admin/teachers/edit/${t.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </a>

                <button
                  onClick={() => deleteUser(t.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

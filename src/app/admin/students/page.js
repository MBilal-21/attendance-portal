"use client";
import { useEffect, useState } from "react";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("/api/admin/students"); // API route to fetch students
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 px-4 border">Roll No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border">{s.roll_no}</td>
                <td className="py-2 px-4 border">{s.name}</td>
                <td className="py-2 px-4 border">{s.email}</td>
                <td className="py-2 px-4 border">{s.class_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function AddUserPage() {
  const [role, setRole] = useState("teacher");
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    class_id: "",
    roll_no: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadClasses() {
      const res = await fetch("/api/admin/classes/list");
      const data = await res.json();
      setClasses(data);
    }
    loadClasses();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const payload = { ...form, role };

    const res = await fetch("/api/admin/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
    } else {
      setMessage("User added successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        class_id: "",
        roll_no: "",
      });
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

      {message && (
        <div className="p-2 mb-4 text-center text-white bg-blue-600 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <select
            className="w-full border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {role === "student" && (
          <>
            <div>
              <label className="block mb-1">Select Class</label>
              <select
                className="w-full border p-2 rounded"
                value={form.class_id}
                onChange={(e) => setForm({ ...form, class_id: e.target.value })}
              >
                <option value="">-- Select Class --</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.program_name} | Semester {c.semester} | {c.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Roll Number</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={form.roll_no}
                onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
              />
            </div>
          </>
        )}

        <button
          className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

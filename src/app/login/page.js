"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    if (data.role === "admin") window.location.href = "/admin";
    else if (data.role === "teacher") window.location.href = "/teacher";
    else window.location.href = "/student";
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f6ff] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* ========== LEFT SIDE ========== */}
        <div className="hidden md:flex flex-col justify-between  bg-[#6C63FF] p-8 lg:p-12 relative bee">
          <div className="text-white text-lg font-semibold self-end">
            <Image
              src="/logo.svg"
              alt="Smart School Logo"
              width={120}
              height={120}
              className="inline-block mr-2"
            />
            {/* Smart School */}
          </div>
          <div className="bg-[#ffffff24] backdrop-blur-md p-6 rounded-md space-y-6">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/loginpic.svg"
              alt="Smart School Illustration"
              width={350}
              height={350}
              className="object-contain"
            />
          </div>

          <p className="text-white text-center text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
            "Empowering education through seamless management — your journey
            to smarter school operations starts here."
          </p>
          </div>
        </div>


        {/* ========== RIGHT SIDE (FORM) ========== */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
              <p className="text-sm text-gray-400">
                Welcome back! Please login to your account.
              </p>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600">User Name</label>
              <input
                type="email"
                placeholder="Enter User Name"
                className="mt-1 w-full border border-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-600">Password</label>
                <span className="text-xs text-[#6C63FF] hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <input
                type="password"
                placeholder="Enter Password"
                className="mt-1 w-full border border-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#6C63FF]"
              />
              <span className="text-sm text-gray-500">Remember me</span>
            </div>

            <button
              className="w-full bg-[#6C63FF] text-white py-2.5 rounded-lg font-semibold hover:bg-[#5a51e6] transition-all cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

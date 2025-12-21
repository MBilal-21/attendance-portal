"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdvertisementBar from "@/components/AdvertisementBar";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaUserCircle,
  FaBullhorn,
} from "react-icons/fa";

export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [showAd, setShowAd] = useState(true);
  const [showAds, setShowAds] = useState(true);


  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) setUser(await res.json());
      } catch { }
    }
    checkAuth();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900 overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo2.svg" alt="Attendance Portal" width={140} height={40} />
          <span className="font-semibold text-lg">Attendance Portal</span>
        </Link>

        <nav>
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Sign in
            </Link>
          ) : (
            <Link
              href={`/${user.role}`}
              className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow hover:shadow-md transition"
            >
              <FaUserCircle className="text-indigo-600" />
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500 capitalize">
                ({user.role})
              </span>
            </Link>
          )}
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center py-16">

        {/* LEFT CONTENT – SLIDE FROM LEFT */}
        <div className="md:col-span-2 space-y-6 animate-slide-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Smarter attendance for schools & colleges
          </h1>

          <p className="text-gray-600 max-w-xl">
            Secure, role-based attendance management with reporting and exports.
          </p>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Get started
            </Link>
            <Link href="#features" className="text-sm text-gray-700 underline">
              Learn more
            </Link>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-6 text-xl text-gray-600">
            <FaFacebook className="hover:text-indigo-600 cursor-pointer" />
            <FaLinkedin className="hover:text-indigo-600 cursor-pointer" />
            <FaGithub className="hover:text-indigo-600 cursor-pointer" />
          </div>
        </div>

        {/* RIGHT SIDE – ADVERTISEMENT */}
        <div className="relative hidden md:block">





          <div className="bg-white rounded-xl shadow-xl p-4 animate-slide-right">
            <h3 className="font-semibold mb-3">📢 Anoucement</h3>
            <p className="text-sm text-gray-600 mb-3">
              New semester attendance system is now live.
            </p>

            {/* IMAGE ZOOM (NO CARD EXPAND) */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/assets/loginpic.svg"
                alt="Advertisement"
                width={400}
                height={300}
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

        </div>
      </section>
      {/* ================= ADVERTISEMENT ================= */}
      {/* ADVERTISEMENT TOGGLE BUTTON */}
      <button
        onClick={() => setShowAds(true)}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-40
    bg-indigo-600 text-white px-3 py-4 rounded-l-xl shadow-lg
    animate-pulse hover:bg-indigo-700 transition"
      >
        <FaBullhorn />
      </button>

      <AdvertisementBar open={showAds} setOpen={setShowAds} />



      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature title="Easy marking" desc="Fast daily attendance marking." />
          <Feature title="Reports" desc="Export CSV & Excel reports." />
          <Feature title="Secure access" desc="JWT auth & role-based access." />
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Our Location</h2>
            <p className="text-gray-600">
              Department of IT, University Campus
            </p>
          </div>

          <iframe
            className="w-full h-64 rounded-lg border"
            loading="lazy"
            src="https://www.google.com/maps?q=University%20Campus&output=embed"
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500 flex justify-between">
        <div>© {new Date().getFullYear()} Attendance Portal</div>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-6 rounded-lg border hover:shadow-lg transition hover:-translate-y-1">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

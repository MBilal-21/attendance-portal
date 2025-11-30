import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "University Attendance Portal",
  description: "Student, Teacher & Admin Attendance System — attendance made simple",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo2.svg"
            alt="Attendance Portal"
            width={140}
            height={40}
            style={{ height: "auto" }}
            priority
          />
          <span className="font-semibold text-lg">Attendance Portal</span>
        </Link>

        <nav className="space-x-4 text-sm">
          <Link href="/login" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            Sign in
          </Link>
          <Link href="/admin" className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100">
            Admin
          </Link>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Smarter attendance for schools & colleges
          </h1>
          <p className="text-gray-600 max-w-xl">
            Manage student, teacher and admin attendance with a simple, secure system.
            Fast sign-in, role-based dashboards, automated reports and easy integrations.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-md font-medium hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              href="/#features"
              className="text-sm text-gray-700 hover:underline"
            >
              Learn more
            </Link>
          </div>

          <div className="flex gap-6 items-center text-sm text-gray-500 mt-6">
            <div>✅ Role-based dashboards</div>
            <div>✅ CSV / Excel export</div>
            <div>✅ Secure auth</div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md">
            <Image
              src="/assets/loginpic.svg"
              alt="Illustration"
              width={720}
              height={720}
              style={{ height: "auto" }}
              priority={false}
            />
          </div>
        </div>
      </section>

      <section id="features" className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Easy marking"
            desc="Quickly mark attendance using a simple UI — manual or bulk."
          />
          <Feature
            title="Reports & export"
            desc="Generate daily/weekly/monthly reports and export as CSV or Excel."
          />
          <Feature
            title="Roles & permissions"
            desc="Separate dashboards for Admin, Teacher and Student with secure access."
          />
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500 flex justify-between items-center">
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
    <div className="p-6 rounded-lg border hover:shadow-md transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
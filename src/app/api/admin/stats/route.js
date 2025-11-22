import { query } from "@/lib/db";

export async function GET() {
  try {
    const [studentsRows] = await query("SELECT COUNT(*) as count FROM students");
    const [teachersRows] = await query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
    const [classesRows] = await query("SELECT COUNT(*) as count FROM classes");
    const [subjectsRows] = await query("SELECT COUNT(*) as count FROM subjects");

    const stats = {
      students: studentsRows[0]?.count || 0,
      teachers: teachersRows[0]?.count || 0,
      classes: classesRows[0]?.count || 0,
      subjects: subjectsRows[0]?.count || 0,
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), { status: 500 });
  }
}

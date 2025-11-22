// /app/api/student/attendance/route.js
import { getUserFromToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(req) {
  const authUser = await getUserFromToken(req);
  if (!authUser || authUser.role !== 'student') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

  // Map users.id -> students.id
  const students = await query('SELECT id FROM students WHERE user_id = ?', [authUser.id]);
  if (!students.length) return new Response(JSON.stringify({ error: 'Student profile not found' }), { status: 404 });
  const studentId = students[0].id;

  const rows = await query(
    `SELECT a.id, a.date, a.status, s.subject_name, c.program_id, c.semester, c.section, c.start_year
     FROM attendance a
     JOIN subjects s ON a.subject_id = s.id
     JOIN classes c ON a.class_id = c.id
     WHERE a.student_id = ?
     ORDER BY a.date DESC`,
    [studentId]
  );

  return new Response(JSON.stringify(rows), { status: 200 });
}

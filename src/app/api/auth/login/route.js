export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { signToken } from "@/lib/auth";
import cookie from "cookie";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const users = await query(
      "SELECT id, email, password, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!users.length) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    // plain text check (your current test)
    if (password !== user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ id: user.id, role: user.role });

    const response = NextResponse.json(
      { message: "Logged in", role: user.role },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      cookie.serialize(
        process.env.COOKIE_NAME || "token",
        token,
        {
          httpOnly: true,
          secure: true,          // REQUIRED on Vercel
          sameSite: "lax",
          path: "/",
          maxAge: Number(process.env.COOKIE_MAX_AGE || 172800),
        }
      )
    );

    return response;

  } catch (err) {
    console.error("LOGIN CRASH:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



// export const runtime = "nodejs";

// import { query } from '@/lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken, setTokenCookie } from '@/lib/auth';

// export async function POST(req) {
//   const body = await req.json();
//   const { email, password } = body;

//   if (!email || !password) 
//     return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });

//   const users = await query('SELECT * FROM users WHERE email = ?', [email]);
//   if (!users.length) 
//     return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

//   const user = users[0];
//   const ok = await bcrypt.compare(password, user.password);
//   if (!ok) 
//     return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

//   const token = signToken({ id: user.id, role: user.role });
//   const res = new Response(JSON.stringify({ message: 'Logged in', role: user.role }), { status: 200 });
//   setTokenCookie(res, token);
//   return res;
// }

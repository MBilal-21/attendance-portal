import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}





// // /lib/db.js
// import mysql from 'mysql2/promise';

// export async function getConnection() {
//   return mysql.createConnection({
//     host: process.env.DATABASE_HOST || 'localhost',
//     user: process.env.DATABASE_USER || 'root',
//     password: process.env.DATABASE_PASSWORD || '',
//     database: process.env.DATABASE_NAME || 'attendance_portal',
//   });
// }

// export async function query(sql, params=[]) {
//   const conn = await getConnection();
//   try {
//     const [rows] = await conn.execute(sql, params);
//     return rows;
//   } finally {
//     await conn.end();
//   }
// }

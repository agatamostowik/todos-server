import postgresql from "pg";

const { Pool } = postgresql;

// const pool = new Pool({
//   user: "agata",
//   database: "todos",
//   password: "",
//   host: "127.0.0.1",
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

export const query = async (command) => {
  try {
    const client = await pool.connect();

    const response = await client.query(command);

    client.release();

    return response.rows;
  } catch (error) {
    console.log("CONNECTION ERROR:", error);
  }
};

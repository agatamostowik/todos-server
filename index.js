import express from "express";
import cors from "cors";

import { query } from "./postgresql.js";

const app = express();
const port = process.env.port || 3001;

app.use(
  cors({
    origin: [
      "https://todos-node-client.herokuapp.com/",
      "http://localhost:3000",
    ],
  })
);

app.get("/", function (req, res) {
  res.send("hello from root route!");
});

app.get("/api/todos", async function (req, res) {
  const result = await query("SELECT * FROM lista");

  res.json(result);
});

// app.get("", (req, res) => {
//   console.log("ping");
//   res.json([
//     {
//       id: Math.random(),
//       label: "A",
//       subtasks: [
//         {
//           id: Math.random(),
//           label: "C",
//           subtasks: [],
//         },
//         {
//           id: Math.random(),
//           label: "D",
//           subtasks: [
//             {
//               id: Math.random(),
//               label: "H",
//               subtasks: [],
//             },
//             {
//               id: Math.random(),
//               label: "L",
//               subtasks: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: Math.random(),
//       label: "B",
//       subtasks: [],
//     },
//     {
//       id: Math.random(),
//       label: "P",
//       subtasks: [],
//     },
//   ]);
// });

app.listen(port, () => {
  console.log(`aplikacja działa na http://localhost:${port}/ I <3 Skarbek`);
});

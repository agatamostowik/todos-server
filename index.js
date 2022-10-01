import express from "express";
import cors from "cors";

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("hello from root route!");
});

app.get("/contact", function (req, res) {
  res.send("hello from contact!!!!!");
});

app.get("/api/todos", (req, res) => {
  res.json([
    {
      id: Math.random(),
      label: "A",
      subtasks: [
        {
          id: Math.random(),
          label: "C",
          subtasks: [],
        },
        {
          id: Math.random(),
          label: "D",
          subtasks: [
            {
              id: Math.random(),
              label: "H",
              subtasks: [],
            },
            {
              id: Math.random(),
              label: "L",
              subtasks: [],
            },
          ],
        },
      ],
    },
    {
      id: Math.random(),
      label: "B",
      subtasks: [],
    },
    {
      id: Math.random(),
      label: "P",
      subtasks: [],
    },
  ]);
});

app.listen(port, () => {
  console.log(`aplikacja działa na http://localhost:${port}/ I <3 Skarbek`);
});

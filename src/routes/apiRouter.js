import { Router } from "express";
import { todosRouter } from "./todosRouter.js";

export const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "hello from /api route" });
});
apiRouter.use("/todos", todosRouter);

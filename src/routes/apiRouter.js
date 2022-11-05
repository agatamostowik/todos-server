import { Router } from "express";
import { todosRouter } from "./todosRouter.js";
import { authRouter } from "./authRouter.js";

export const apiRouter = Router();

apiRouter.use("/todos", todosRouter);
apiRouter.use("/auth", authRouter);

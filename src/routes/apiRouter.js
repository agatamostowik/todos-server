import { Router } from "express";
import { todosRouter } from "./todosRouter.js";
import { tagsRouter } from "./tagsRouter.js";
import { authRouter } from "./authRouter.js";
import { checkAuthenticationMiddleware } from "../middlewares/checkAuthenticationMiddleware.js";

export const apiRouter = Router();

apiRouter.use("/todos", checkAuthenticationMiddleware, todosRouter);
apiRouter.use("/tags", checkAuthenticationMiddleware, tagsRouter);
apiRouter.use("/auth", authRouter);

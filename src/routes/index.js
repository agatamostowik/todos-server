import { Router } from "express";
import { apiRouter } from "./apiRouter.js";

export const rootRouter = Router();

rootRouter.use("/api", apiRouter);

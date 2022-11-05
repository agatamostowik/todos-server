import { Router } from "express";
import { rootController } from "../controllers/rootController.js";
import { apiRouter } from "./apiRouter.js";

export const rootRouter = Router();

rootRouter.get("/", rootController);
rootRouter.use("/api", apiRouter);

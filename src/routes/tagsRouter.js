import { Router } from "express";
import { getTagsController } from "../controllers/getTagsController.js";
import { addTagController } from "../controllers/addTagController.js";
import { deleteTagController } from "../controllers/deleteTagController.js";

export const tagsRouter = Router();

tagsRouter.get("/", getTagsController);
tagsRouter.post("/", addTagController);
tagsRouter.delete("/", deleteTagController);

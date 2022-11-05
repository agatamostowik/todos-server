import { Router } from "express";

import { editTodoController } from "../controllers/editTodoController.js";
import { deleteTodoController } from "../controllers/deleteTodoController.js";
import { addTodoController } from "../controllers/addTodoController.js";
import { getTodoController } from "../controllers/getTodoController.js";
import { validateEditTodoMiddleware } from "../middlewares/validateEditTodoMiddleware.js";
import { validatePostTodoMiddleware } from "../middlewares/validatePostTodoMiddleware.js";

export const todosRouter = Router();

todosRouter.get("/", getTodoController);
todosRouter.post("/", validatePostTodoMiddleware, addTodoController);
todosRouter.delete("/:todoId", deleteTodoController);
todosRouter.put(
  "/:todoId/edit",
  validateEditTodoMiddleware,
  editTodoController
);

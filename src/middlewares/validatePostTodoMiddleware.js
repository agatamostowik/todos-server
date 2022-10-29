import { z } from "zod";

export const validatePostTodoMiddleware = function (req, res, next) {
  const bodySchema = z.object({
    label: z.string(),
    parentId: z.union([z.number(), z.null()]),
    ancestorsIds: z.array(z.number().optional()),
  });

  try {
    bodySchema.parse(req.body);

    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};

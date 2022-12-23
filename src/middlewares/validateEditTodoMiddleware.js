import { z } from "zod";

export const validateEditTodoMiddleware = (req, res, next) => {
  const bodySchema = z.object({
    label: z.string().min(1).optional(),
    status: z.enum(["new", "in_progress", "done"]).optional(),
    addedTags: z
      .array(
        z.object({
          id: z.literal("new_tag").or(z.number()),
          name: z.string().min(1),
        })
      )
      .optional(),
    removedTags: z
      .array(z.object({ id: z.number(), name: z.string().min(1) }))
      .optional(),
  });

  const paramsSchema = z.object({
    todoId: z.string().refine((value) => {
      const number = Number(value);

      return Number.isFinite(number);
    }),
  });
  try {
    console.log("Starting validation of body", req.body);
    bodySchema.parse(req.body);
    console.log("Validation of body succeeded");

    console.log("Starting validation of params", req.params);
    paramsSchema.parse(req.params);
    console.log("Validation of params succeeded");
    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};

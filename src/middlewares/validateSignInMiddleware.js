import { z } from "zod";

export const validateSignInMiddleware = (req, res, next) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  try {
    console.log("Parsing body request: ", req.body);
    bodySchema.parse(req.body);
    console.log("Request body matched with schema");
    next();
  } catch (error) {
    console.log("Request body validation failed");
    res.status(500).send("Bad request: incorrect parameters");
  }
};

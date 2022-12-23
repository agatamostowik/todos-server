import { z } from "zod";

export const validateSignUpMiddleware = (req, res, next) => {
  const bodySchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(8),
  });

  try {
    console.log("Parsing body request: ", req.body);
    bodySchema.parse(req.body);
    console.log("Request body matched with schema");
    next();
  } catch (error) {
    console.log("Request body validation failed");
    console.error(error);
    res.status(500).send("Bad request: incorrect parameters");
  }
};

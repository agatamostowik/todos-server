import { getTags } from "../models/index.js";

export const getTagsController = async (req, res) => {
  const user = await req.user;

  const result = await getTags(user.id);

  res.json(result);
};

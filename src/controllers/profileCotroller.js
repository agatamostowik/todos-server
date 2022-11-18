export const profileController = async (req, res) => {
  const user = await req.user;
  console.log("user: ", user);
  res.json(user);
};

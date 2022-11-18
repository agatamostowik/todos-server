export const signInController = async (req, res) => {
  const user = await req.user;
  const { password, ...rest } = user;

  res.json(rest);
};

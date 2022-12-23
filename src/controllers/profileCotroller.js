export const profileController = async (req, res) => {
  const user = await req.user;
  console.log("me: ", user);
  
  res.json(user);
};

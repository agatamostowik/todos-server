export const signOutController = (req, res) => {
  req.session = null;

  res.status(200).send({ status: "ok" });
};

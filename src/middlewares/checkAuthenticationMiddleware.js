export const checkAuthenticationMiddleware = (req, res, next) => {
  // req.isAuthenticated() will return true if user is logged in

  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send("nie jestes zalogowany!");
  }
};

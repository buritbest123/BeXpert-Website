// This is a middleware function that checks if the user is authenticated by checking if the session has a user object.
// If the user object is present, the middleware calls the next() function, allowing the request to proceed.
// If the user object is not present, the middleware returns a 401 Unauthorized error.

module.exports = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

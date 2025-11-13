const { getLoggedOnUser } = require("../util/memoryStore");

const auth = (req, res, next) => {
  const user = getLoggedOnUser(); // get the current logged-on user
  if (user) {
    req.user = user; // attach user to req for downstream use
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;


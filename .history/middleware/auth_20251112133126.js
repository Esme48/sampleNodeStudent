const { getLoggedOnUser } = require("../util/memoryStore");

const auth = (req, res, next) => {
  const user = getLoggedOnUser(); 
  if (user) {
    req.user = user; 
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;


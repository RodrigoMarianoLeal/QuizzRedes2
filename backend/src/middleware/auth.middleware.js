const jwt = require("jsonwebtoken");

const publicPaths = ["/", "/auth"];

const authMiddleware = (req, res, next) => {
  const {
    headers: { authorization },
    url,
    method,
  } = req;

  if (publicPaths.includes(url) || (url === "/user" && method === "POST")) {
    return next();
  }

  try {
    if (!authorization) {
      throw new Error("Authorization not exists");
    }

    const [, token] = authorization.split(" ");
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.headers.loggedUser = user;

    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = authMiddleware;

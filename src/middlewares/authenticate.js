import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/user.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createHttpError(401, "Access token missing or malformed"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createHttpError(401, "Access token expired"));
    }
    next(createHttpError(401, "Invalid access token"));
  }
};

export default authenticate;

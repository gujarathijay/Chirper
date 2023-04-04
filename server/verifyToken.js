import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return handleError(401, "No token provided");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Invalid token"));
    req.user = user;
    next();
  });
};

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, "Invalid token"));
        const requestUser = user.user;
        req.user = requestUser;
        next();
    });
};
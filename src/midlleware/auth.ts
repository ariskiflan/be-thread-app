import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { authMidlleware } from "../type/app";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!);

    if (!decoded) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    res.locals.user = (decoded as authMidlleware).id;
    return next();
  } catch (error) {
    const err = error as unknown as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export default auth;

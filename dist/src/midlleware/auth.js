"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        res.locals.user = decoded.id;
        return next();
    }
    catch (error) {
        const err = error;
        // console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};
exports.default = auth;

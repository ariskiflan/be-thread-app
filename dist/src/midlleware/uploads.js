"use strict";
// import { NextFunction, Request, Response } from "express";
// import multer from "multer";
// import path from "path";
// import { v2 as cloudinary } from "cloudinary";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
// pastikan folder uploads ada di root project
const uploadDir = path_1.default.join(process.cwd(), "src", "uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // selalu ke projectRoot/src/uploads
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname.replace(/\s/g, ""));
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
}).fields([
    { name: "image", maxCount: 4 },
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
]);
const multerMidlleware = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("=== MASUK MULTER ===");
            if (err instanceof multer_1.default.MulterError) {
                console.log("MULTER ERROR:", err);
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        status: false,
                        message: "File too large",
                    });
                }
                return res.status(500).json({
                    status: false,
                    message: err.message,
                });
            }
            console.log("REQ FILES KEYS:", Object.keys(req.files || {}));
            console.log("REQ BODY:", req.body);
            if (req.files) {
                try {
                    const files = req.files;
                    const { image, avatar, cover } = files;
                    if (image && image.length > 0) {
                        const imagesUrls = yield Promise.all(image.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                            console.log("UPLOAD FILE PATH:", img.path);
                            try {
                                const imageUrl = yield cloudinary_1.v2.uploader.upload(img.path);
                                console.log("UPLOAD RESULT:", imageUrl);
                                return { image: imageUrl.secure_url };
                            }
                            catch (error) {
                                console.log("CLOUDINARY ERROR:", error);
                            }
                        })));
                        req.body.image = imagesUrls;
                        console.log("REQ.BODY setelah upload:", req.body);
                    }
                    if (avatar && avatar.length > 0) {
                        const avatarUrl = yield cloudinary_1.v2.uploader.upload(avatar[0].path);
                        req.body.avatar = avatarUrl.secure_url;
                    }
                    if (cover && cover.length > 0) {
                        const coverUrl = yield cloudinary_1.v2.uploader.upload(cover[0].path);
                        req.body.cover = coverUrl.secure_url;
                    }
                }
                catch (error) {
                    console.log("PROCESS ERROR:", error);
                }
            }
            return next();
        }));
    });
};
exports.default = multerMidlleware;

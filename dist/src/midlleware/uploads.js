"use strict";
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
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../uploads"));
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
    {
        name: "image",
        maxCount: 4,
    },
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "cover",
        maxCount: 1,
    },
]);
const multerMidlleware = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err instanceof multer_1.default.MulterError) {
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
            if (req.files) {
                try {
                    const files = req.files;
                    const { image, avatar, cover } = files;
                    if (image && image.length > 0) {
                        const imagesUrls = yield Promise.all(image.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                            try {
                                const imageUrl = yield cloudinary_1.v2.uploader.upload(img.path);
                                const images = {
                                    image: imageUrl.secure_url,
                                };
                                return images;
                            }
                            catch (error) {
                                console.log(error);
                            }
                        })));
                        req.body.image = imagesUrls;
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
                    console.log(error);
                }
            }
            return next();
        }));
    });
};
exports.default = multerMidlleware;

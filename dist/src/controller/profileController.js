"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileById = exports.getProfile = exports.updateProfile = void 0;
const ProfileServices = __importStar(require("../services/profileServices"));
const cloudinary_1 = require("cloudinary");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const { body } = req;
        const files = req.files;
        if (files && files.cover && files.cover[0] && files.cover[0].filename) {
            const cover = files.cover[0].filename;
            const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + cover);
            body.cover = cloudinaryResponse.secure_url;
        }
        if (files && files.avatar && files.avatar[0] && files.avatar[0].filename) {
            const avatar = files.avatar[0].filename;
            const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + avatar);
            body.avatar = cloudinaryResponse.secure_url;
        }
        yield ProfileServices.updateProfile(userId, body);
        res.json({
            status: true,
            message: "success",
        });
    }
    catch (error) {
        const err = error;
        // console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.updateProfile = updateProfile;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user;
        const profile = yield ProfileServices.getProfile(userId);
        res.json({
            status: true,
            message: "success",
            data: profile,
        });
    }
    catch (error) {
        const err = error;
        // console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getProfile = getProfile;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const profile = yield ProfileServices.getProfile(+id);
        res.json({
            status: true,
            message: "success",
            data: profile,
        });
    }
    catch (error) {
        const err = error;
        // console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getProfileById = getProfileById;

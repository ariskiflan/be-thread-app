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
exports.getCurrentLike = exports.createLike = exports.getLikes = void 0;
const likesServices = __importStar(require("../services/likesServices"));
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const likes = yield likesServices.getLikes(+threadId);
        res.json({
            status: true,
            message: "success",
            data: {
                user: likes,
            },
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getLikes = getLikes;
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.body;
        const userId = res.locals.user;
        const likes = yield likesServices.createLike({ threadId, userId });
        res.json({
            status: true,
            message: " likes success",
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.createLike = createLike;
const getCurrentLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const userId = res.locals.user;
        const like = yield likesServices.getCurrentLike(+threadId, +userId);
        res.json({
            status: true,
            message: "success",
            data: {
                like,
            },
        });
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
});
exports.getCurrentLike = getCurrentLike;

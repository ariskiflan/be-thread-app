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
exports.deleteThread = exports.getReplies = exports.createThread = exports.getThreadByUserId = exports.getThreadByToken = exports.getThread = exports.getThreads = void 0;
const threadService = __importStar(require("../services/threadServices"));
const getThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thread = yield threadService.getThreads();
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.getThreads = getThreads;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const thread = yield threadService.getThread(+id);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.getThread = getThread;
const getThreadByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.user;
        const thread = yield threadService.getThreadByToken(+id);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.getThreadByToken = getThreadByToken;
const getThreadByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const thread = yield threadService.getThreadByUserId(+id);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.getThreadByUserId = getThreadByUserId;
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        body.userId = res.locals.user;
        if (body.threadId) {
            body.threadId = +body.threadId;
        }
        const thread = yield threadService.createThread(body);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.createThread = createThread;
const getReplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const replies = yield threadService.getReplies(+id);
        res.json({
            status: true,
            message: "success",
            data: replies,
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
exports.getReplies = getReplies;
const deleteThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = res.locals.user;
        const thread = yield threadService.deleteThread(+id, +userId);
        res.json({
            status: true,
            message: "success",
            data: thread,
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
exports.deleteThread = deleteThread;

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
exports.getReplies = exports.deleteThread = exports.createThread = exports.getThreadByUserId = exports.getThreadByToken = exports.getThread = exports.getThreads = void 0;
const db_1 = __importDefault(require("../db"));
const getThreads = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            threadId: null,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            auhtor: {
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    email: true,
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    replies: true,
                    like: true,
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
});
exports.getThreads = getThreads;
const getThread = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findFirst({
        where: {
            id,
            threadId: null,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            auhtor: {
                select: {
                    username: true,
                    id: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true,
                            bio: true,
                            cover: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    replies: true,
                    like: true,
                },
            },
        },
    });
});
exports.getThread = getThread;
const getThreadByToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            userId: id,
            threadId: null,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            auhtor: {
                select: {
                    username: true,
                    id: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    replies: true,
                    like: true,
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
});
exports.getThreadByToken = getThreadByToken;
const getThreadByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            userId: id,
            threadId: null,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            auhtor: {
                select: {
                    username: true,
                    id: true,
                    fullname: true,
                    thread: {
                        select: {
                            content: true,
                            posted_at: true,
                            id: true,
                        },
                    },
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    replies: true,
                    like: true,
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
});
exports.getThreadByUserId = getThreadByUserId;
const createThread = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const thread = yield db_1.default.thread.create({
        data: {
            content: payload.content,
            userId: payload.userId,
            threadId: payload.threadId ? +payload.threadId : null,
        },
    });
    if (payload.image && payload.image.length > 0) {
        yield db_1.default.threadImage.createMany({
            data: payload.image.map((img) => ({
                image: img.image,
                threadId: thread.id,
            })),
        });
    }
    return thread;
});
exports.createThread = createThread;
const deleteThread = (idThread, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existedThread = yield db_1.default.thread.findFirst({
        where: {
            id: idThread,
        },
    });
    if (!existedThread)
        throw new Error("thread not found");
    if (existedThread.userId !== userId)
        throw new Error("you dont have permission to delete this Thread ");
    yield db_1.default.threadImage.deleteMany({
        where: {
            threadId: idThread,
        },
    });
    yield db_1.default.thread.delete({
        where: {
            id: idThread,
        },
    });
    return true;
});
exports.deleteThread = deleteThread;
const getReplies = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            threadId,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            auhtor: {
                include: {
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    replies: true,
                    like: true,
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
});
exports.getReplies = getReplies;

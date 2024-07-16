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
exports.getFollowersUsers = exports.getFollowingUsers = exports.getFollowing = exports.getFollower = exports.follow = void 0;
const db_1 = __importDefault(require("../db"));
const follow = (followerId, followingId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFollow = yield db_1.default.follow.findFirst({
        where: {
            followerId,
            followingId,
        },
    });
    if (existingFollow) {
        yield db_1.default.follow.deleteMany({
            where: {
                followerId,
                followingId,
            },
        });
        return "unfollowing successful";
    }
    const follow = yield db_1.default.follow.create({
        data: {
            followerId,
            followingId,
        },
    });
    return "following successful";
});
exports.follow = follow;
const getFollower = (followingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.follow.findMany({
        where: {
            followingId: +followingId,
        },
        select: {
            follower: {
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    profile: {
                        select: {
                            avatar: true,
                            bio: true,
                        },
                    },
                },
            },
        },
    });
});
exports.getFollower = getFollower;
const getFollowing = (followerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.follow.findMany({
        where: {
            followerId: +followerId,
        },
        include: {
            following: {
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    profile: {
                        select: {
                            avatar: true,
                            bio: true,
                        },
                    },
                },
            },
        },
    });
});
exports.getFollowing = getFollowing;
const getFollowingUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUsers = yield db_1.default.follow.findMany({
        where: {
            followerId: userId,
        },
        include: {
            following: {
                include: {
                    profile: {
                        select: {
                            avatar: true,
                            bio: true,
                        },
                    },
                },
            },
        },
    });
    return followingUsers.map((follow) => follow.following);
});
exports.getFollowingUsers = getFollowingUsers;
const getFollowersUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const followersUsers = yield db_1.default.follow.findMany({
        where: {
            followingId: userId,
        },
        include: {
            follower: {
                include: {
                    profile: {
                        select: {
                            avatar: true,
                            bio: true,
                        },
                    },
                    follower: true,
                },
            },
        },
    });
    return followersUsers.map((follow) => follow.follower);
});
exports.getFollowersUsers = getFollowersUsers;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotId = exports.getUsersSearch = exports.login = exports.register = exports.getUser = exports.getUsers = void 0;
const db_1 = __importDefault(require("../db"));
const register_1 = require("../lib/validation/register");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany();
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            username: true,
            fullname: true,
            profile: {
                select: {
                    avatar: true,
                    cover: true,
                    bio: true,
                },
            },
            follower: {
                select: {
                    followerId: true,
                },
            },
            following: {
                select: {
                    followingId: true,
                },
            },
        },
    });
});
exports.getUser = getUser;
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = register_1.registerValidator.validate(payload);
    if (error)
        throw new Error(error.details[0].message);
    const isExist = yield db_1.default.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username,
                },
                {
                    email: value.email,
                },
            ],
        },
    });
    if (isExist)
        throw new Error("Username or Email already exist");
    const hasPassword = yield bcrypt.hash(value.password, 10);
    value.password = hasPassword;
    const user = yield db_1.default.user.create({
        data: Object.assign({}, value),
    });
    const profile = yield db_1.default.profile.create({
        data: {
            userId: user.id,
        },
    });
    return { user, profile };
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email: username,
                },
            ],
        },
    });
    if (!user)
        throw new Error("user or password is not valid");
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error("user or password is not valid");
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
    }, process.env.SECRET_KEY, {
        expiresIn: "1D",
    });
    return token;
});
exports.login = login;
const getUsersSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
        include: {
            following: {
                select: {
                    followingId: true,
                },
            },
            follower: {
                select: {
                    followerId: true,
                },
            },
            profile: {
                select: {
                    avatar: true,
                    bio: true,
                },
            },
        },
    });
});
exports.getUsersSearch = getUsersSearch;
// export const getOtherUsers = async (id: number) => {
//   const user = await db.$queryRaw`
//     SELECT "User".id, "User".username, "User".fullname, "Profile".avatar
//     FROM "User"
//     LEFT JOIN "Profile" ON "User".id = "Profile"."userId"
//     where "User".id != ${id}
//     ORDER BY random()
//     LIMIT 5`;
//   return user;
// };
const getUserNotId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findMany({
        where: {
            NOT: {
                id: id,
            },
        },
        include: {
            follower: {
                select: {
                    followerId: true,
                },
            },
            following: {
                select: {
                    followingId: true,
                },
            },
            profile: {
                select: {
                    avatar: true,
                    bio: true,
                },
            },
        },
    });
});
exports.getUserNotId = getUserNotId;

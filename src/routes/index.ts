import express from "express";
import {
  follow,
  getFollower,
  getFollowings,
} from "../controller/followController";
import { getUsers, login, register } from "../controller/userController";
import auth from "../midlleware/auth";
import uploadMidlleware from "../midlleware/upload";
import { getProfile, updateProfile } from "../controller/profileController";
import {
  createThread,
  getReplies,
  getThread,
  getThreadByToken,
  getThreads,
} from "../controller/threadController";
import { createLike, getLikes } from "../controller/likesController";

const Route = express.Router();

Route.post("/register", register);
Route.post("/login", login);
Route.get("/users", auth, getUsers);

Route.patch("/profile", auth, uploadMidlleware("cover"), updateProfile);
Route.get("/profile", auth, getProfile);
Route.get("/profile/:id", auth, getProfile);

Route.post("/thread", auth, uploadMidlleware("image"), createThread);
Route.get("/threads", getThreads);
Route.get("/thread/:id", auth, getThread);
Route.get("/threadByToken", auth, getThreadByToken);
Route.get("/replies/:id", auth, getReplies);

Route.post("/likes", auth, createLike);
Route.get("/likes/:threadId", auth, getLikes);

Route.post("/follow", auth, follow);
Route.get("/follower/:followingId", auth, getFollower);
Route.get("/following/:followerId", auth, getFollowings);

export default Route;

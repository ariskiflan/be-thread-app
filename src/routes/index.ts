import express from "express";
import {
  follow,
  getFollower,
  getFollowings,
} from "../controller/followController";
import {
  getUsers,
  getUsersSearch,
  login,
  register,
} from "../controller/userController";
import auth from "../midlleware/auth";
import uploadMidlleware from "../midlleware/upload";
import { getProfile, updateProfile } from "../controller/profileController";
import {
  createThread,
  deleteThread,
  getReplies,
  getThread,
  getThreadByToken,
  getThreads,
} from "../controller/threadController";
import {
  createLike,
  getCurrentLike,
  getLikes,
} from "../controller/likesController";

const Route = express.Router();

Route.post("/register", register);
Route.post("/login", login);
Route.get("/users", auth, getUsers);
Route.get("/user", auth, getUsersSearch);

Route.patch("/profile", auth, uploadMidlleware("cover"), updateProfile);
Route.get("/profile", auth, getProfile);
Route.get("/profile/:id", auth, getProfile);

Route.post("/thread", auth, uploadMidlleware("image"), createThread);
Route.get("/threads", getThreads);
Route.get("/thread/:id", auth, getThread);
Route.get("/threadByToken", auth, getThreadByToken);
Route.delete("/deleteThread/:id", auth, deleteThread);
Route.get("/replies/:id", auth, getReplies);

Route.post("/like", auth, createLike);
Route.get("/likes/:threadId", auth, getLikes);
Route.get("/like/:threadId", auth, getCurrentLike);

Route.post("/follow", auth, follow);
Route.get("/follower/:followingId", auth, getFollower);
Route.get("/following/:followerId", auth, getFollowings);

export default Route;

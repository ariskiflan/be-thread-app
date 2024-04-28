import express from "express";
import {
  follow,
  getFollower,
  getFollowersUsers,
  getFollowings,
  getFollowingsUsers,
} from "../controller/followController";
import {
  // getOtherUsers,
  getUser,
  getUserNotId,
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
  getThreadByUserId,
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
Route.get("/user/:id", auth, getUser);

Route.patch("/profile", auth, uploadMidlleware("cover"), updateProfile);
Route.get("/profile", auth, getProfile);
Route.get("/profile/:id", auth, getProfile);

Route.post("/thread", auth, uploadMidlleware("image"), createThread);
Route.get("/threads", getThreads);
Route.get("/thread/:id", auth, getThread);
Route.get("/threadByToken", auth, getThreadByToken);
Route.delete("/deleteThread/:id", auth, deleteThread);
Route.get("/replies/:id", auth, getReplies);
Route.get("/threadByUserId/:id", auth, getThreadByUserId);

Route.post("/like", auth, createLike);
Route.get("/likes/:threadId", auth, getLikes);
Route.get("/like/:threadId", auth, getCurrentLike);

Route.post("/follow", auth, follow);
Route.get("/follower/:followingId", auth, getFollower);
Route.get("/following/:followerId", auth, getFollowings);
Route.get("/follower", auth, getFollowersUsers);
Route.get("/following", auth, getFollowingsUsers);
// Route.get("/suggestions", auth, getOtherUsers);
Route.get("/suggested", auth, getUserNotId);

export default Route;

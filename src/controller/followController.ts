import { Request, Response } from "express";
import db from "../db";
import * as followServices from "../services/followServices";
import { tracingChannel } from "diagnostics_channel";

export const follow = async (req: Request, res: Response) => {
  try {
    const { followingId } = req.body;
    const followerId = res.locals.user;

    const follow = await followServices.follow(followerId, followingId);

    res.json({
      success: true,
      message: follow,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getFollower = async (req: Request, res: Response) => {
  try {
    const { followingId } = req.params;

    const followers = await followServices.getFollower(+followingId);

    res.json({
      success: true,
      message: "success",
      data: followers,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getFollowings = async (req: Request, res: Response) => {
  try {
    const { followerId } = req.params;

    const followings = followServices.getFollowing(+followerId);

    res.json({
      success: true,
      message: "success",
      data: followings,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getFollowingsUsers = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;

    const followings = await followServices.getFollowingUsers(id);

    res.json({
      success: true,
      message: "success",
      data: followings,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getFollowersUsers = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;

    const followers = await followServices.getFollowersUsers(id);

    res.json({
      success: true,
      message: "success",
      data: followers,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

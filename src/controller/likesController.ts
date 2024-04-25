import { Request, Response } from "express";
import * as likesServices from "../services/likesServices";

export const getLikes = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const likes = await likesServices.getLikes(+threadId);

    res.json({
      status: true,
      message: "success",
      data: {
        user: likes,
      },
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const createLike = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.body;
    const userId = res.locals.user;
    const likes = await likesServices.createLike({ threadId, userId });

    res.json({
      status: true,
      message: " likes success",
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getCurrentLike = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const userId = res.locals.user;
    const like = await likesServices.getCurrentLike(+threadId, +userId);

    res.json({
      status: true,
      message: "success",
      data: {
        like,
      },
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

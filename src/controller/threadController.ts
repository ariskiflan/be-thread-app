import { Request, Response } from "express";
import * as threadService from "../services/threadServices";

export const getThreads = async (req: Request, res: Response) => {
  try {
    const thread = await threadService.getThreads();

    res.json({
      status: true,
      message: "success",
      data: thread,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await threadService.getThread(+id);
    res.json({
      status: true,
      message: "success",
      data: thread,
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

export const getThreadByToken = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;
    const thread = await threadService.getThreadByToken(+id);
    res.json({
      status: true,
      message: "success",
      data: thread,
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

export const getThreadByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await threadService.getThreadByUserId(+id);
    res.json({
      status: true,
      message: "success",
      data: thread,
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

export const createThread = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.userId = res.locals.user;
    if (body.threadId) {
      body.threadId = +body.threadId;
    }

    const thread = await threadService.createThread(body);

    res.json({
      status: true,
      message: "success",
      data: thread,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const replies = await threadService.getReplies(+id);

    res.json({
      status: true,
      message: "success",
      data: replies,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const deleteThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user;
    const thread = await threadService.deleteThread(+id, +userId);
    res.json({
      status: true,
      message: "success",
      data: thread,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

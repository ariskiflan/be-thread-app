import { Request, Response } from "express";
import * as ProfileServices from "../services/profileServices";
import { v2 as cloudinary } from "cloudinary";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const { body } = req;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files && files.cover && files.cover[0] && files.cover[0].filename) {
      const cover = files.cover[0].filename;
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./src/uploads/" + cover
      );
      body.cover = cloudinaryResponse.secure_url;
    }

    if (files && files.avatar && files.avatar[0] && files.avatar[0].filename) {
      const avatar = files.avatar[0].filename;
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./src/uploads/" + avatar
      );
      body.avatar = cloudinaryResponse.secure_url;
    }

    await ProfileServices.updateProfile(userId, body);

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    const err = error as unknown as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const profile = await ProfileServices.getProfile(userId);
    res.json({
      status: true,
      message: "success",
      data: profile,
    });
  } catch (error) {
    const err = error as unknown as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profile = await ProfileServices.getProfile(+id);

    res.json({
      status: true,
      message: "success",
      data: profile,
    });
  } catch (error) {
    const err = error as unknown as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

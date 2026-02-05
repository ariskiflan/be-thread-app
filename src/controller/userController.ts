import { Request, Response } from "express";
import * as userServices from "../services/userServices";

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await userServices.register(body);
    console.log("Login payload:", body);

    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = (error as unknown) as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // ambil payload dari body dulu
    const { username, password } = req.body;
    console.log("Login payload:", username, password);

    // panggil service login
    const result = await userServices.login(username, password);

    // console.log("Login success, token:", token);

    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Login error:", err.message);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsers();

    res.json({
      status: true,
      message: "success",
      data: users,
    });
  } catch (error) {
    const err = (error as unknown) as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUser(+id);
    res.json({
      status: true,
      message: "success",
      data: user,
    });
  } catch (error) {
    const err = (error as unknown) as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUsersSearch = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsersSearch();

    res.json({
      status: true,
      message: "success",
      data: users,
    });
  } catch (error) {
    const err = (error as unknown) as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// export const getOtherUsers = async (req: Request, res: Response) => {
//   try {
//     const loggedInUserId = res.locals.user;
//     const users = await userServices.getOtherUsers(loggedInUserId);

//     res.json({
//       status: true,
//       message: "success",
//       data: users,
//     });
//   } catch (error) {
//     const err = error as unknown as Error;

//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

export const getUserNotId = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;
    const users = await userServices.getUserNotId(id);

    res.json({
      status: true,
      message: "success",
      data: users,
    });
  } catch (error) {
    const err = (error as unknown) as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

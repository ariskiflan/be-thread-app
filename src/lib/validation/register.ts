import joi from "joi";
import { Iregister } from "../../type/app";

export const registerValidator = joi.object<Iregister>({
  email: joi.string().email().required(),
  username: joi.string().required(),
  fullname: joi.string().required(),
  password: joi.string().required(),
});

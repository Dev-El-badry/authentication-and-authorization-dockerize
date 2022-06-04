import { Request, Response, NextFunction } from "express";
import {
  getAll,
  getOne,
} from "../../../../../engine/factories/handler.factories";
import { User, UserDoc } from "../../models/user.models";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.params.id = (req.user as UserDoc).id;
  next();
};

export const getUsers = getAll(User);

export const assignRole = async (req: Request, res: Response) => {
  const currentUser = req.user as UserDoc;
  const user = await User.findById(currentUser.id).update({
    roles: req.body.roles,
  });

  res.json({ status: "success" });
};

export const getUser = getOne(User, { path: "roles" });

import express from "express";
import { protect } from "../../../../engine/middlewares/protect";
import { restrictTo } from "../../../../engine/middlewares/restrict-to";
import {
  assignRole,
  getMe,
  getUser,
  getUsers,
} from "../controllers/api/users.controller";
import { authRouter } from "./auth.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use(protect); //middleware to get current user and for authenticate user
router.get("/me", getMe, getUser);

router.use(restrictTo("child")); //middleware to get user role and for check if has access to show it
router.get("/", getUsers);
router.post("/role", assignRole);

export { router as userApiRouter };

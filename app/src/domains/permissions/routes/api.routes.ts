import express from "express";
import { getPermissions } from "../controllers/api/permission.controller";

export const router = express.Router();

router.get("/", getPermissions);

export { router as permissionApiRouter };

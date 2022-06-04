import express from "express";
import { protect } from "../../engine/middlewares/protect";
import { restrictTo } from "../../engine/middlewares/restrict-to";
import { permissionApiRouter } from "../domains/permissions/routes/api.routes";

import { roleApiRouter } from "../domains/roles/routes/api.routes";
import { userApiRouter } from "../domains/users/routes/api.routes";

const router = express.Router();

router.use("/users", userApiRouter);

router.use(protect);
router.use(restrictTo("root")); //middleware to get user role and for check if has access to show it

router.use("/roles", roleApiRouter);
router.use("/permissions", permissionApiRouter);

export { router as apiRouter };

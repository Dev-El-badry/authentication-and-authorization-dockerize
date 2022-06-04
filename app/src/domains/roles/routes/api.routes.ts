import express from "express";
import { validateRequest } from "../../../../engine/middlewares/validate-request";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/api/role.controller";
import { rolesValidation } from "../validations/roles.validation";

const router = express.Router();
//////////
//ROLES
//////////

router.route("/").get(getRoles);
router.route("/show/:id").get(getRole);

router.post("/", rolesValidation, validateRequest, createRole);
router
  .route("/:id")
  .put(rolesValidation, validateRequest, updateRole)
  .delete(deleteRole);

export { router as roleApiRouter };

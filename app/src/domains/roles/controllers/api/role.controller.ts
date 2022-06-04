import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../../../../engine/factories/handler.factories";
import { Role } from "../../models/role.model";

export const getRoles = getAll(Role, "", { path: "permissions" });
export const getRole = getOne(Role, { path: "permissions" });
export const createRole = addOne(Role);
export const updateRole = updateOne(Role);
export const deleteRole = deleteOne(Role);

import { getAll } from "../../../../../engine/factories/handler.factories";
import { Permission } from "../../models/permission.model";

export const getPermissions = getAll(Permission);

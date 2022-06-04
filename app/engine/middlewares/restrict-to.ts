import { Request, Response, NextFunction } from "express";
import { PermissionDoc } from "../../src/domains/permissions/models/permission.model";
import { UserDoc } from "../../src/domains/users/models/user.models";
import { NoAuthorizedError } from "../errors/no-authorized-error";

export const restrictTo = (spot: string = "root") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req!.user as UserDoc;

    if (currentUser.isSuperAdmin) return next();

    let status: boolean = false;
    const roles = currentUser.roles;

    for (let role of roles) {
      for (let permission of role.permissions) {
        const access = hasAccess(req, permission, spot);
        if (access) {
          status = true;
          break;
        }
      }
    }

    if (status) next();
    else throw new NoAuthorizedError();
  };
};

const hasAccess = (req: Request, permission: any, spot: string): boolean => {
  const route = `/api/v1/${permission.module}`;

  if (spot !== "root") {
    return (
      `${req.baseUrl}`.startsWith(route) && req.method === permission.method
    );
  }

  return (
    `${req.baseUrl}${req.url}`.startsWith(route) &&
    req.method === permission.method
  );
};

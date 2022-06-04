import { body } from "express-validator";
import { Role } from "../models/role.model";

export const rolesValidation: any = [
  body("name")
    .notEmpty()
    .withMessage("name not be empty")
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "name must be above than 1 characters and below than 50 characters"
    )
    .custom((val, { req }) => {
      let customValidation: { [key: string]: any } = {};
      const id = req.params?.id;
      if (id) {
        customValidation["id"] = id;
      }
      return Role.findOne({
        name: val,
        ...customValidation,
      })
        .then((record) => {
          if (record) {
            return Promise.reject("Role name is already exists");
          }
        })
        .catch((err) => {
          return Promise.reject("Role name is already exists");
        });
    }),
];

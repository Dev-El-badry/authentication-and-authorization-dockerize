import { BasicDTO } from "../../../../engine/lib/base-dto";
import { UserDoc } from "../models/user.models";

export class UserBasicDTO extends BasicDTO {
  static shape(entity: UserDoc) {
    return {
      id: entity.id,
      username: entity.username,
      activation: entity.activation ? "active" : "inactive",
    };
  }
}

import mongoose from "mongoose";
import { PermissionDoc } from "../../permissions/models/permission.model";

//An interface that describe the properties
//that are required to create new Role
interface RoleAttrs {
  name: string;
}

//An interface that describe the properties
//that a Role Model has
interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}

//An interface what describe properties
//that a Role document has
export interface RoleDoc extends mongoose.Document {
  name: string;
  permissions: PermissionDoc[];
}

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

RoleSchema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

RoleSchema.pre(/^find/, function (done) {
  this.populate({
    path: "permissions",
  });

  done();
});

const Role = mongoose.model<RoleDoc, RoleModel>("Role", RoleSchema);
export { Role };

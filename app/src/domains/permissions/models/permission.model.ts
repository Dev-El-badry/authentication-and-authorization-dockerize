import mongoose from "mongoose";

//An interface that describe the properties
//that are required to create new permission
interface PermissionAttrs {
  module: string;
  name: string;
  ability: string;
  method: string;
}

//An interface that describe the properties
//that a Permission Model has
interface PermissionModel extends mongoose.Model<PermissionDoc> {
  build(attrs: PermissionAttrs): PermissionDoc;
}

//An interface what describe properties
//that a Permission document has
export interface PermissionDoc extends mongoose.Document {
  module: string;
  name: string;
  ability: string;
  method: string;
}

const PermissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ability: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

PermissionSchema.statics.build = (attrs: PermissionAttrs) => {
  return new Permission(attrs);
};

const Permission = mongoose.model<PermissionDoc, PermissionModel>(
  "Permission",
  PermissionSchema
);
export { Permission };

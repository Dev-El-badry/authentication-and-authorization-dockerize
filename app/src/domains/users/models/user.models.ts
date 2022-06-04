import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { RoleDoc } from "../../roles/models/role.model";

//An interface that describe the properties
//that are required to create new User
interface UserAttrs {
  username: string;
  password: string;
  activation: boolean;
  isSuperAdmin: boolean;
}

//An interface that describe the properties
//that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface what describe properties
//that a User document has
export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  activation: boolean;
  roles: RoleDoc[];
  isSuperAdmin: boolean;
  correctPassword: (password: string, userPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter your username"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password must be above or equal 8 characters"],
      select: false,
    },

    activation: {
      type: Boolean,
      default: true,
      select: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    isSuperAdmin: {
      type: Boolean,
      default: false,
      select: true,
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

userSchema.pre("save", async function (done) {
  if (!this.isModified("password")) return done();
  const hashed = await bcrypt.hash(this.get("password"), 12);
  this.set("password", hashed);

  done();
});

userSchema.pre("/^find/", function (done) {
  this.find({ activation: { $ne: false } }).populate({
    path: "roles",
  });
  done();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };

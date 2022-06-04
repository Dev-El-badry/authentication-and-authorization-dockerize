import mongoose from "mongoose";

import path from "path";
import { readdir, stat, readFile } from "fs/promises";

import { keys } from "../config/keys";
import { Permission } from "../src/domains/permissions/models/permission.model";

const permissionsList: any[] = [];

async function processDir(dirPath: string) {
  let files = await readdir(dirPath);

  for (let i in files) {
    const currentObj = path.join(dirPath, files[i]);
    let statObj = await stat(currentObj);
    if (statObj.isFile() && currentObj.indexOf("/rules/") !== -1) {
      const data: any = JSON.parse(
        await readFile(currentObj, { encoding: "utf-8" })
      );

      const module: string = data["MODULE"];
      const permissions = Object.values(data["PERMISSIONS"]) as {
        name: string;
        ability: string;
        method: string;
      }[];

      for (let permission of permissions) {
        permissionsList.push({
          module: module,
          name: permission.name,
          ability: permission.ability,
          method: permission.method,
        });
      }
    } else if (statObj.isDirectory()) {
      await processDir(`${dirPath}/${files[i]}`);
    }
  }
}

const importPermissions = async () => {
  await mongoose.connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const domainsPath = path.join(__dirname, "/../src/domains");
  await processDir(domainsPath);

  await Permission.create(permissionsList);
  console.log("permissions inserted!");
  process.exit();
};

const deletePermissions = async () => {
  await mongoose.connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await Permission.deleteMany();
  console.log("permissions deleted!");
  process.exit();
};

const argv = process.argv;

if (argv.includes("--import")) {
  importPermissions();
} else if (argv.includes("--delete")) {
  deletePermissions();
}

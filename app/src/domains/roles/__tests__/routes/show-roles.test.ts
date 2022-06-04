import { app } from "../../../../app";
import request from "supertest";
import mongoose from "mongoose";
import { Permission } from "../../../permissions/models/permission.model";

//returns 404 is the role is not found
it("returns 404 if the role is not found", async () => {
  const fakeRoleId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/v1/roles/show/${fakeRoleId}`)
    .set("Cookie", await global.signup())
    .send()
    .expect(404);
});

//returns the role if the role is found
it("returns the role if the role is found", async () => {
  const cookie = await global.signup();
  const permission = await Permission.create({
    module: "role",
    method: "GET",
    ability: "/roles",
    name: "roles test",
  });
  const createRole = {
    name: "first role",
    permissions: [permission.id],
  };
  const response = await request(app)
    .post("/api/v1/roles")
    .set("Cookie", cookie)
    .send(createRole);

  const resp = await request(app)
    .get(`/api/v1/roles/show/${response.body.data.data.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(201);
});

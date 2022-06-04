import request from "supertest";
import { app } from "../../../../app";
import { Permission } from "../../../permissions/models/permission.model";
import { Role } from "../../models/role.model";

// check if has a route handle listening to /api/v1/roles for post requests
it("if has a route handle listening to /api/v1/roles for post request", async () => {
  const response = await request(app).post("/api/v1/roles").send({});
  expect(response.status).not.toEqual(404);
});

// check if has a route handle listening to /api/v1/roles for post requests
it("can only be accessed it the user is signed in", async () => {
  return request(app).post("/api/v1/roles").send({}).expect(401);
});

// return a status other than 401 if the user is signed in
it("return a status other than 401 if the user is signed in", async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .post("/api/v1/roles")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

//return an error if an invalid name is provided
it("return an error if an invalid name is provided", async () => {
  await request(app)
    .post("/api/v1/roles")
    .set("Cookie", await global.signup())
    .send({
      name: "",
    })
    .expect(422);
});

//return an error if an invalid permission is provided
it("return an error if an invalid permission is provided", async () => {
  await request(app)
    .post("/api/v1/roles")
    .set("Cookie", await global.signup())
    .send({
      name: "role test",
      permissions: ["abc"],
    })
    .expect(400);
});

//creates role with valid inputs
it("creates role with valid inputs", async () => {
  let roles = await Role.find({});
  expect(roles.length).toEqual(0);
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
    .set("Cookie", await global.signup("seller"))
    .send(createRole)
    .expect(201);

  roles = await Role.find({});
  expect(roles.length).toEqual(1);
  expect(roles[0].name).toEqual(createRole.name);
});

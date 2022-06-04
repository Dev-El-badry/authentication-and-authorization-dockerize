import request from "supertest";
import { app } from "../../../../app";
import { Permission } from "../../../permissions/models/permission.model";
import { Role } from "../../models/role.model";

// check if has a route handle listening to /api/v1/roles/123 for put requests
it("if has a route handle listening to /api/v1/roles/123 for put request", async () => {
  const response = await request(app).put("/api/v1/roles/123").send({});
  expect(response.status).not.toEqual(404);
});

// check if has a route handle listening to /api/v1/roles/123 for put requests
it("can only be accessed it the user is signed in", async () => {
  return request(app).put("/api/v1/roles/123").send({}).expect(401);
});

// return a status other than 401 if the user is signed in
it("return a status other than 401 if the user is signed in", async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .put("/api/v1/roles/123")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

//return an error if an invalid name is provided
it("return an error if an invalid name is provided", async () => {
  await request(app)
    .put("/api/v1/roles/123")
    .set("Cookie", await global.signup())
    .send({
      name: "",
    })
    .expect(422);
});

//return an error if an invalid permission is provided
it("return an error if an invalid permission is provided", async () => {
  await request(app)
    .put("/api/v1/roles/123")
    .set("Cookie", await global.signup())
    .send({
      name: "role test",
      permissions: ["abc"],
    })
    .expect(400);
});

//creates Role with valid inputs
it("creates Role with valid inputs", async () => {
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
  const createdRole = await request(app)
    .post("/api/v1/roles")
    .set("Cookie", cookie)
    .send(createRole)
    .expect(201);

  let Roles = await Role.find({});
  expect(Roles.length).toBeGreaterThan(0);
  const id = createdRole.body.data.data.id;
  const response = await request(app)
    .put(`/api/v1/roles/${id}`)
    .set("Cookie", cookie)
    .send({ name: "AA" })
    .expect(201);

  Roles = await Role.find({});

  expect(Roles[0].name).toEqual("AA");
});

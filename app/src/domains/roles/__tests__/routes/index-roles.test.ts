import { app } from "../../../../app";
import request from "supertest";
import { Permission } from "../../../permissions/models/permission.model";

it("can fetch a list of roles", async () => {
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
  await request(app)
    .post("/api/v1/roles")
    .set("Cookie", await global.signup("seller"))
    .send(createRole)
    .expect(201);

  const response = await request(app)
    .get("/api/v1/roles")
    .set("Cookie", await global.signup())
    .send()
    .expect(201);
  expect(response.body.data.data.length).toEqual(1);
});

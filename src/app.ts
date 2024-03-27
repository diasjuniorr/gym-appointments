import fastify from "fastify";
import { registerUserConttroller } from "./http/controllers/create-user.controller";

export const app = fastify();

app.post("/users", registerUserConttroller);

import fastify from "fastify";
import { registerUserConttroller } from "./http/controllers/register.controller";

export const app = fastify();

app.post("/users", registerUserConttroller);

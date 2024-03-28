import fastify from "fastify";
import { ZodError } from "zod";
import { setupRoutes } from "./http/routes";

export const app = fastify();

app.register(setupRoutes);

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError) {
    res.status(400).send({ reason: error.errors });
  }

  res.status(500).send({ reason: "internal server error" });
});

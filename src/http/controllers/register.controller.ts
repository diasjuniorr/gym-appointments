import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function registerUserConttroller(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = requestBodySchema.parse(req.body);

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return res.status(409).send();
  }

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return res.status(201).send();
}

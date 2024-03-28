import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateUserUseCase } from "../../use-cases/create-user-use-case";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  execute = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    const requestBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = requestBodySchema.parse(req.body);

    const result = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      if (result.value.code === 500) {
        console.error(result.value.message);
        return res
          .status(result.value.code)
          .send({ reason: "internal server error" });
      }

      return res
        .status(result.value.code)
        .send({ reason: result.value.message });
    }

    return res.status(201).send({ user: { id: result.value.user.id } });
  };
}

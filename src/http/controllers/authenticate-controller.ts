import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../../use-cases/authenticate-use-case";
import { z } from "zod";

export class AuthenticateController {
  private authenticateUseCase: AuthenticateUseCase;

  constructor(authenticateUseCase: AuthenticateUseCase) {
    this.authenticateUseCase = authenticateUseCase;
  }

  execute = async (req: FastifyRequest, res: FastifyReply) => {
    const requestBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = requestBodySchema.parse(req.body);

    const result = await this.authenticateUseCase.execute({ email, password });

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

    return res.status(200).send();
  };
}

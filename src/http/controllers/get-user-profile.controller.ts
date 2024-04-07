import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetUserProfileUseCase } from "../../use-cases/get-user-profile-use-case";

export class GetUserProfileController {
  private getuserProfileUseCase: GetUserProfileUseCase;

  constructor(getUserProfileUseCase: GetUserProfileUseCase) {
    this.getuserProfileUseCase = getUserProfileUseCase;
  }

  execute = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    const { id } = req.params as { id: string };

    const result = await this.getuserProfileUseCase.execute(id);

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

    const { email, name, created_at } = result.value;

    return res.status(201).send({ user: { id, name, email, created_at } });
  };
}

import { Request, Response } from "express"
import { CreateUsuarioUseCase } from "@modules/accounts/useCases/createUsuario/createUsuarioUseCase";
import { container } from "tsyringe";


class CreateUsuarioController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { nome, isAdmin, senha, email } = request.body;

    const createUsuarioUseCase = container.resolve(CreateUsuarioUseCase);

    await createUsuarioUseCase.execute({
      nome, 
      isAdmin,
      senha, 
      email
    });
  
    return response.status(201).send();
  }
}

export { CreateUsuarioController };
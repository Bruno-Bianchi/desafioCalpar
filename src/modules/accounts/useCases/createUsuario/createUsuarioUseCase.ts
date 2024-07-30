import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { ICreateUsuarioDTO } from "@modules/accounts/dtos/ICreateUsuarioDTO"
import { IUsuarioRepository } from "@modules/accounts/repositories/IUsuarioRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUsuarioUseCase {
  constructor(
    @inject("UsuarioRepository") 
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute({nome, isAdmin, senha, email }: ICreateUsuarioDTO): Promise<void> {

    const usuarioJaExiste = await this.usuarioRepository.findByEmail(email);
    
    if(usuarioJaExiste){
      throw new AppError("Usuário já cadastrado!");
    }

    const passwordHash = await hash(senha, 8);

    await this.usuarioRepository.create({
      nome , 
      isAdmin, 
      senha: passwordHash,
      email
    })
  }
}

export { CreateUsuarioUseCase }
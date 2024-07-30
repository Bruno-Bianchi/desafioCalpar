import { injectable, inject } from "tsyringe";
import { IUsuarioRepository } from "@modules/accounts/repositories/IUsuarioRepository";
import { hash } from "bcrypt";

interface IRequest {
  email: string
  senha: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
  ){}

  async execute({ senha, email }: IRequest): Promise<void> {
    const user = await this.usuarioRepository.findByEmail(email);
    
    user.senha = await hash(senha, 8);

    await this.usuarioRepository.save(user);
  }
}
 
export { ResetPasswordUserUseCase }

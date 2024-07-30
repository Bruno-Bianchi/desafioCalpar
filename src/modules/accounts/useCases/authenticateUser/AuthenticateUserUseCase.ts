import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import auth  from "@config/auth"

import { IUsuarioRepository } from "@modules/accounts/repositories/IUsuarioRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsuarioTokenRepository } from "@modules/accounts/repositories/IUsuarioTokenRepository";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: {
    nome: string,
    email: string
  }
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
    @inject("UsuarioTokenRepository")
    private usuarioTokenRepository: IUsuarioTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, senha }: IRequest): Promise<IResponse> {
    //usuário existe
    const user = await this.usuarioRepository.findByEmail(email);

    if(!user){
      throw new AppError("Email ou senha incorreto!");
    }

    const senhaMatch = await compare(senha, user.senha);

    if(!senhaMatch){
      throw new AppError("Email ou senha incorreto!");
    }

    const { 
      expires_in_token, 
      secret_token, 
      secret_refresh_token, 
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth
    
    //gerar jsonwebtoken
    const token = sign({}, secret_token, { 
      subject: user.id_usuario,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id_usuario,
      expiresIn: expires_in_refresh_token
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usuarioTokenRepository.create({
      usuario_id: user.id_usuario,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        nome: user.nome,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }

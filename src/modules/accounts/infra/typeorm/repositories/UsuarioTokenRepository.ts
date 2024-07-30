import { IUsuarioTokenRepository } from "@modules/accounts/repositories/IUsuarioTokenRepository";
import { Repository, getRepository } from "typeorm";
import { UsuarioToken } from "../entities/UsuarioToken";
import { ICreateUsuarioTokenDTO } from "@modules/accounts/dtos/ICreateUsuarioTokenDTO";


class UsuarioTokenRepository implements IUsuarioTokenRepository {
  private repository: Repository<UsuarioToken>

  constructor() {
    this.repository = getRepository(UsuarioToken);
  }

  async create({ 
    usuario_id,
    expires_date, 
    refresh_token 
  }: ICreateUsuarioTokenDTO): Promise<UsuarioToken> {
    const userToken = this.repository.create({
      usuario_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(usuario_id: string, refresh_token: string): Promise<UsuarioToken> {
    const usersTokens = await this.repository.findOne({
      usuario_id,
      refresh_token,
    })
    return usersTokens;
  }

  async deleteById(id_usuario_token: string): Promise<void> {
    await this.repository.delete(id_usuario_token);
  }

  async findByRefreshToken(refresh_token: string): Promise<UsuarioToken> {
    const userToken = await this.repository.findOne({refresh_token});
    return userToken
  }
}

export { UsuarioTokenRepository }

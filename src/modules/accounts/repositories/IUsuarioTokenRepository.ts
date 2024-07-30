import { ICreateUsuarioTokenDTO } from "../dtos/ICreateUsuarioTokenDTO";
import { UsuarioToken } from "../infra/typeorm/entities/UsuarioToken";

interface IUsuarioTokenRepository {
  create({ 
    usuario_id,
    expires_date, 
    refresh_token
  }: ICreateUsuarioTokenDTO): Promise<UsuarioToken>;

  findByUserIdAndRefreshToken(usuario_id: string, refresh_token: string): Promise<UsuarioToken | undefined>;
  deleteById(id_usuario_token: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UsuarioToken| undefined>;
}

export { IUsuarioTokenRepository }
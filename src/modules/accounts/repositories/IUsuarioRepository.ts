import { ICreateUsuarioDTO } from "@modules/accounts/dtos/ICreateUsuarioDTO";
import { Usuario } from "@modules/accounts/infra/typeorm/entities/Usuario";

interface IUsuarioRepository {
  create(data: ICreateUsuarioDTO): Promise<void>;
  findByEmail(email:string): Promise<Usuario>;
  findById(id: string): Promise<Usuario>;
  save(user: Usuario): Promise<void>;
}

export { IUsuarioRepository }
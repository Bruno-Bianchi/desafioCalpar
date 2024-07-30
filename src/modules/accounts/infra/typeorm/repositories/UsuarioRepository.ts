import { ICreateUsuarioDTO } from "@modules/accounts/dtos/ICreateUsuarioDTO";
import { Repository, getRepository } from "typeorm";
import { Usuario } from "@modules/accounts/infra/typeorm/entities/Usuario"

class UsuarioRepository implements UsuarioRepository {
  private repository: Repository<Usuario>;

  constructor() {
    this.repository = getRepository(Usuario);
  }
 
  async create({
      nome,
      senha,
      email
    }:ICreateUsuarioDTO): Promise<void> {
    const usuario = this.repository.create({
      nome,
      senha,
      email
    })

    await this.repository.save(usuario)
  }

  async findByEmail(email: string): Promise<Usuario> {
    const user = await this.repository.findOne({where: {email}});
    return user;
  }

  async findById(id: string): Promise<Usuario> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async save(user: Usuario): Promise<void> {
    await this.repository.save(user);
  }
}

export { UsuarioRepository }
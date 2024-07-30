import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("usuario")
class Usuario {
  @PrimaryColumn()
  id_usuario: string;

  @Column()
  nome: string;

  @Column()
  isAdmin: boolean;

  @Column()
  senha: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id_usuario){
      this.id_usuario = uuidV4();
    }
  }
}

export { Usuario }
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { Usuario } from "./Usuario";

@Entity("usuario_token")
class UsuarioToken {
  @PrimaryColumn()
  id_usuario_token: string;

  @ManyToOne(() => Usuario, { nullable: true, eager: true })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id_usuario' })
  usuario_id?: string

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if(!this.id_usuario_token) {
      this.id_usuario_token = uuidv4();
    }
  }
}

export { UsuarioToken }

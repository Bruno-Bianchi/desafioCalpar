import { Usuario } from "@modules/accounts/infra/typeorm/entities/Usuario";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cliente")
  class Cliente {
    @PrimaryColumn()
    id_cliente: string;

    @ManyToOne(() => Usuario, { nullable: true, eager: true })
    @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id_usuario' })
    usuario_id: string
  
    @Column()
    nome: string;
  
    @Column()
    disponivel: string;
    
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if(!this.id_cliente){
        this.id_cliente = uuidV4();
      }
    }
  }

export { Cliente }

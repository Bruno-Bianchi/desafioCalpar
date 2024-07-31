import { ICreateClienteDTO } from "../dtos/ICreateClienteDTO"
import { Cliente } from "../infra/typeorm/entities/Cliente"


interface IClienteRepository {
    create({ usuario_id, nome, disponivel } : ICreateClienteDTO): Promise<Cliente>;
    list (
        search: string,
        page: number,
        rowsPerPage: number,
        order: string,
        filter: string
    ): Promise<Cliente[]>
    count (search: string, filter: string): Promise<number>
    update({ id_cliente, usuario_id, nome, disponivel } : ICreateClienteDTO): Promise<Cliente>; 
    delete(id_cliente: string): Promise<void>;
    findByName(nome: string): Promise<Cliente>;
}

export { IClienteRepository }

import { ICreateClienteDTO } from "@modules/Menu/dtos/ICreateClienteDTO";
import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { Cliente } from "../entities/Cliente";
import { Brackets, getRepository, Repository } from "typeorm";
import { AppError } from "@shared/errors/AppError";

class ClienteRepository implements IClienteRepository {

    private repository: Repository<Cliente>;

    constructor(){
        this.repository = getRepository(Cliente)
    }

    async create({ usuario_id, nome, disponivel }: ICreateClienteDTO): Promise<Cliente> {
        try {
            const cliente = this.repository.create({
                usuario_id,
                nome,
                disponivel
            });
    
            const result = await this.repository.save(cliente)
    
            return result
        } catch (error) {
            throw new AppError(error);   
        }   
    }

    async findByName(nome: string): Promise<Cliente> {
        try {
            const cliente = await this.repository.findOne({nome});
            
            return cliente;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async list (
        search: string,
        page: number,
        rowsPerPage: number,
        order: string,
        filter: string
    ): Promise<Cliente[]> {
        let columnName: string
        let columnDirection: 'ASC' | 'DESC'

        const referenceArray = [
            "nome",
            "disponivel",
        ]
        const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

        const index = referenceArray.indexOf(columnName)

        columnOrder[index] = columnDirection

        const offset = rowsPerPage * page

        try {
          let query = this.repository.createQueryBuilder('cli')
            .select([
            'cli.id_cliente as "idCliente"',
            'usu.nome as "criadoPor"',
            'cli.nome as "nome"',
            'cli.disponivel as "disponivel"'
          ])

        if (filter) {
            query = query
            .where(filter)
        }

        const clientes = await query
            .andWhere(new Brackets(query => {
                query.andWhere('CAST(cli.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
            }))
            .addOrderBy('cli.nome', columnOrder[0])
            .addOrderBy('cli.disponivel', columnOrder[1])
            .leftJoin('cli.usuario_id', 'usu')
            .offset(offset)
            .limit(rowsPerPage)
            .take(rowsPerPage)
            .getRawMany()

        return clientes
        } catch (err) {
            throw new AppError(err)
        }
    }

    async count (
        search: string,
        filter: string
    ): Promise<number> {
      try {
        let query = this.repository.createQueryBuilder('cli')
          .select([
            'cli.id_cliente as "idCliente"',
          ])

        if (filter) {
          query = query
            .where(filter)
        }

        const clientes = await query
          .andWhere(new Brackets(query => {
            query.andWhere('CAST(cli.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          }))
          .getRawMany()

          const count = clientes.length
        return count
      } catch (err) {
        throw new AppError(err)
      }
    }

    async update({ id_cliente, usuario_id, nome, disponivel }: ICreateClienteDTO): Promise<Cliente> {
        try {
            const clienteExiste = await this.repository.findOne(id_cliente);
            
            if(!clienteExiste) {
                throw new AppError("Cliente não encontrado!");
            }
        } catch (error) {
            if(error.message.includes('invalid input syntax for type uuid')) {
                throw new AppError('Cliente não identificado!', 404)
            }
        }
        
        try {
            const novoCliente = this.repository.create({
                id_cliente,
                usuario_id,
                nome,
                disponivel
            });
    
            const result = await this.repository.save(novoCliente)
    
            return result
        } catch (error) {
            throw new AppError(error);   
        }   
    }

    async delete(id_cliente: string): Promise<void> {
        try {
            const clienteExiste = await this.repository.findOne(id_cliente);
            
            if(!clienteExiste) {
                throw new AppError("Cliente não encontrado!");
            }
        } catch (error) {
            if(error.message.includes('invalid input syntax for type uuid')) {
                throw new AppError('Cliente não identificado!', 404)
            }
        }

        try {
            await this.repository.delete(id_cliente)
            return
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { ClienteRepository }